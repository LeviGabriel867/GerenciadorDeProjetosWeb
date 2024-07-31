import React from 'react'
import styles from './linkButton.module.css'
import { Link } from 'react-router-dom'
const linkButton = ({to, text}) => {
  return (
    <Link className={styles.btn} to={to}>
        {text }
    
    </Link>
  )
}

export default linkButton
