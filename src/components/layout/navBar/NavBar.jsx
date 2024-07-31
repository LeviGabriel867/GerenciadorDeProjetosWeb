import React from 'react'
import { Link } from 'react-router-dom'
import Style from './NavBar.module.css'
import logo from '../../../assets/costs_logo.png'
import Container from '../Container'

const NavBar = () => {
  return (
    <nav className={Style.navBar}>
      <Container>
        <Link to="/">
          <img src={logo} alt='costs' />
        </Link>
        <ul className={Style.list}>
          <li className={Style.item}><Link to="/">Home</Link></li>
          <li className={Style.item}><Link to="/projects">Projects</Link></li>
          <li className={Style.item}><Link to="/company">Company</Link></li>
          <li className={Style.item}><Link to="/contact">Contact</Link></li>
        </ul>
      </Container>
    </nav>
  )
}

export default NavBar
