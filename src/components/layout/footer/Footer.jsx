import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import style from './Foorter.module.css'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <ul className={style.socialList}>
        <li><FaFacebook/></li>
        <li><FaInstagram/></li>
        <li><FaLinkedin/></li>
      </ul>
      <p className={style.copy_right}><span>Gerenciador de Projetos</span> &copy;2024</p>
    </footer>
  )
}

export default Footer
