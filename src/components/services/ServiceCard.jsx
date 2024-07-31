import React from 'react'
import style from '../project/ProjectCard.module.css'
import { BsFillTrashFill } from 'react-icons/bs'

const ServiceCard = ({id, name, cost, description, handleRemove}) => {
    const remove=(e)=>{
        e.preventDefault()
        handleRemove(id, cost)
    }
  return (
    <div className={style.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R${cost}
      </p>
      <p>
        {description}
      </p>
      <div className={style.project_card_actions}>
        <button onClick={remove}>
            <BsFillTrashFill/>   
            Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard
