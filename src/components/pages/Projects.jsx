import React, { useState, useEffect } from 'react';
import Message from '../layout/message/Message';
import { useLocation } from 'react-router-dom';
import style from './Projects.module.css';
import Loading from '../layout/Loading/loading';
import Container from '../layout/Container';
import LinkButton from '../pages/button/linkButton';
import ProjectCard from '../project/ProjectCard';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState('');

  const location = useLocation();
  let message = '';

  if (location.state && location.state.message) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(()=>{
      fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log('Fetched data:', data)
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err))
    }, 300);
    },[])

    function removeProject(id){
      fetch(`http://localhost:5000/projects/${id}`, {
        method:'DELETE',
        headers:{
          'Content-Type': 'Application/json'
        }
      }).then(resp => resp.json())
      .then(data =>{
        setProjects(projects.filter((project)=> project.id !== id))
        setProjectMessage('Projeto removido com sucesso.')
      })
      .catch(err => console.log(err))
    }
  return (
    <div className={style.projectContainer}>
      <div className={style.titleContainer}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newProject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}



      <Container customClass="start">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            project && project.name ? (
              <ProjectCard
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category ? project.category.name : 'Sem Categoria'}
                key={project.id}
                handleRemove={removeProject}
              />
            ) : (
              <p key={index}>Projeto inválido.</p>
            )
          ))
        ) : (
          <p>Sem projetos cadastrados.</p>
        )}
        {!removeLoading && <Loading/>}
      </Container>
    </div>
  );
}

export default Projects;
