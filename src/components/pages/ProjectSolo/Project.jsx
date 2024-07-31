import React, { useEffect, useState } from 'react'
import style from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../../layout/Loading/loading'
import Container from '../../layout/Container'
import ProjectForm from '../../project/ProjectForm'
import Message from '../../../components/layout/message/Message'
import ServiceForm from '../../services/ServiceForm'
import { parse, v4 as uuidv4 } from 'uuid'
import ServiceCard from '../../services/ServiceCard'

function Project() {
  const { id } = useParams()
  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [typeMessage, setTypeMessage] = useState()

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(resp => resp.json())
        .then((data) => {
          setProject(data)
          setServices(data.services)
        })
        .catch(err => console.log(err))
    }, 400)
  }, [id])

  function editPost(project) {
    setMessage('')
    // budget validation
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto')
      setTypeMessage('erro')
      return false
    }
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(resp => resp.json())
      .then((data) => {
        setProject(data)
        setShowProjectForm(false)
        setMessage('Projeto atualizado')
        setTypeMessage('success')
      })
      .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function createService(project) {
    setMessage('')
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verique o valor do serviço')
      setTypeMessage('erro')
      project.services.pop()
      return false
    }

    // adicionar valor gasto aos gastos do projeto
    project.cost = newCost

    // update Project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServiceForm(false)
        setMessage('Serviço adicionado com sucesso')
        setTypeMessage('success')
        setProject(data)
        setServices(data.services)
      })
      .catch(err => console.log(err))
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter((service) => service.id !== id)
    const projectUpdated = {
      ...project,
      services: servicesUpdated,
      cost: parseFloat(project.cost) - parseFloat(cost)
    }

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage('Serviço removido com sucesso')
        setTypeMessage('success')
      })
      .catch(err => console.log(err))
  }

  return <> {project.name ? (
    <div className={style.projectDetails}>
      <Container customClass="Column">
        {message && <Message type={typeMessage} msg={message} />}
        <div className={style.detailsContainer}>
          <h1>Projeto: {project.name}</h1>
          <button className={style.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar'}</button>
          {!showProjectForm ? (
            <div className={style.projectInfo}>
              <p>
                <span>Categoria: </span>{project.category.name}
              </p>
              <p>
                <span>Total de Orçamento: </span> R${project.budget}
              </p>
              <p>
                <span>Total utilizado: </span> R${project.cost}
              </p>
            </div>
          ) : (
            <div className={style.projectInfo}>
              <ProjectForm
                handleSubmit={editPost}
                btnText="Concluir edição"
                projectData={project} />
            </div>
          )}
        </div>
        <div className={style.serviceFormContainer}></div>
        <h2>Adicione um serviço:</h2>
        <button
          className={style.btn} onClick={toggleServiceForm}>{!showServiceForm ?
            'Adicionar serviço' : 'Fechar'}
        </button>
        <div className={style.projectInfo}>
          {showServiceForm && <ServiceForm
            handleSubmit={createService}
            btnText="Adicionar serviço"
            projectData={project}
          />}
        </div>
        <h2>Serviços:</h2>
        <Container customClass="start">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard
                id={service.id}
                name={service.name}
                cost={service.cost}
                description={service.description}
                key={service.id}
                handleRemove={() => removeService(service.id, service.cost)}
              />
            ))
          ) : (
            <p>Não há serviços cadastrados.</p>
          )}
        </Container>
      </Container>
    </div>
  ) : (
    <Loading />
  )}
  </>
}

export default Project
