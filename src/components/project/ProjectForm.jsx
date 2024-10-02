import React, { useEffect } from 'react'
import Style from './ProjectForm.module.css'
import ComponenteInput from '../form/ComponenteInput'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import {useState} from 'react'

function ProjectForm({handleSubmit, btnText, projectData}) {
  const [categories, setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})
  const [contact, setContact] = useState({})
  useEffect(()=>{
    fetch("http://localhost:5000/categories",{
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
      },
    })
    .then((resp)=>resp.json())
    .then((data)=> {
      setCategories(data)
    })
    .catch((err)=>console.log(err))
  }, [])
 
  const submit = (e) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e){
    setProject({...project,[e.target.name]: e.target.value})
  }
  function handleContact(e){
    setContact({...contact,[e.target.name]: e.target.value})
  }

  function handleCategory(e){
    setProject({
      ...project,
      category:{
        id:e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

  return (
    <form onSubmit={submit} className={Style.form}>
      <ComponenteInput 
      type="text"
      text="Nome do projeto"
      name="name"
      placeholder="Insira o nome do projeto"
      handleOnChange={handleChange}
      value={project.name ? project.name: ''}
      />
      <ComponenteInput 
      type="text"
      text="Orçamento do projeto"
      name="budget"
      placeholder="Insira o orçamento total"
      handleOnChange={handleChange}
      value={project.budget ? project.budget: ''}
      />
      <Select name="category_id" 
      text="Selecione a categoria"
      options={categories}
      handleOnChange={handleCategory}
      value={project.category? project.category.id: ''}
      />
      <ComponenteInput 
      type="text"
      text="Contato do Diretor"
      name="contact"
      placeholder="Telefone para contato"
      handleOnChange={handleContact}
      value={contact.contact ? contact.contact:''}

      />
        
      
      <SubmitButton text={btnText}/>
    </form>
  )
}

export default ProjectForm
