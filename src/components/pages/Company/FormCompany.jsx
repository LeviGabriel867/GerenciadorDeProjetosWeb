import React, { useState } from 'react';
import style from './FormCompany.module.css';

const FormCompany = () => {
  const [company, setCompany] = useState({
    name: '',
    year: '',
    director: '',
    description: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company),
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('Company created:', data);
      setIsSubmitted(true); // Esconde o formulário e exibe os dados cadastrados
    })
    .catch((err) => console.error('Error:', err));
  };

  return (
    <div className={style.formContainer}>
      {isSubmitted ? (
        <div>
          <h1>Companhia cadastrada com sucesso!</h1>
          <p>Nome: {company.name}</p>
          <p>Ano: {company.year}</p>
          <p>Diretor: {company.director}</p>
          <p>Descrição: {company.description}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome da companhia"
            value={company.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="year"
            placeholder="Ano de fundação"
            value={company.year}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="director"
            placeholder="Diretor"
            value={company.director}
            onChange={handleChange}
            required
          />
          <input className={style.description}
            name="description"
            placeholder="Descrição"
            value={company.description}
            onChange={handleChange}
            required
          />
         
             <button className={style.btn} type="submit">Cadastrar Companhia</button>

         

        </form>
      )}

    </div>
  );
};

export default FormCompany;
