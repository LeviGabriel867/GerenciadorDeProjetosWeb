import React, { useState, useEffect } from 'react'
import style from  './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectCard({id,name,budget, contact,category, handleRemove}){
  const remove = (e)=>{
    handleRemove(id)
  }
  return(
    <div className={style.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R${budget}
      </p>
      <p className={style.categoryText}>
        <span className={`${style[category.toLowerCase()]}`}></span> {category}
      </p>
      <p>
        <span>Contato:</span> {contact}
      </p>

      <div className={style.project_card_actions}>
        <Link to={`/project/${id}`}>
          <BsPencil/> Editar
        </Link>
        <button onClick={remove}>
          <BsFillTrashFill/> Remover
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
