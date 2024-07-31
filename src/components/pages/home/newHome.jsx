import React from 'react'
import styles from './Home.module.css';
import imgFundo from '../../../assets/savings.svg'
import Button from '../button/linkButton';

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <h1>Bem-vindo ao <span>Gerencie</span></h1>

      <p>
        Comece gerenciar de forma eficiente seus projetos 
        agora mesmo!
      </p>
      <Button to="/newproject" text="Criar projeto"/>
      <img src={imgFundo} alt="Costs" />
    </section>
  );
}

export default Home;
