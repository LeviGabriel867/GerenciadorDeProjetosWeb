import React from 'react'
import style from './loading.module.css'
import loadingComponet from '../../../assets/loading.svg'
function loading () {
  return (
    <div className={style.loader_container}>
      <img className={style.loader} src={loadingComponet} alt="Loading" />
    </div>
  )
}

export default loading
