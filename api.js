import express from 'express';
import mysql from 'mysql2';
import { readFile } from 'fs/promises'; // Usando fs/promises para leitura do arquivo JSON

const app = express();
app.use(express.json()); // Para processar JSON enviado no corpo das requisições

// Configurar conexão com o banco de dados MariaDB
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // Sua senha aqui
  database: 'gerenciadorProjetos'
});

// Carregar dados do db.json
const loadJSONData = async () => {
  try {
    const data = await readFile(new URL('./db.json', import.meta.url));
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao carregar o arquivo db.json:', error);
    throw error;
  }
};

// Rota para adicionar novos projetos a partir do db.json
app.post('/loadProjectsFromJSON', async (req, res) => {
  try {
    const dbData = await loadJSONData();

    // Inserir categorias
    dbData.categories.forEach(category => {
      const query = 'INSERT INTO categories (id, name) VALUES (?, ?)';
      connection.query(query, [category.id, category.name], (err) => {
        if (err) throw err;
      });
    });

    // Inserir projetos e serviços associados
    dbData.projects.forEach(project => {
      const queryProject = 'INSERT INTO projects (id, name, budget, cost, category_id) VALUES (?, ?, ?, ?, ?)';
      connection.query(queryProject, [project.id, project.name, project.budget, project.cost, project.category.id], (err) => {
        if (err) throw err;
      });

      project.services.forEach(service => {
        const queryService = 'INSERT INTO services (id, name, cost, description, project_id) VALUES (?, ?, ?, ?, ?)';
        connection.query(queryService, [service.id, service.name, service.cost, service.description, project.id], (err) => {
          if (err) throw err;
        });
      });
    });

    res.status(200).send('Projetos e serviços inseridos no banco de dados a partir de db.json');
  } catch (err) {
    res.status(500).send('Erro ao carregar dados do db.json: ' + err.message);
  }
});

// Rota para adicionar um projeto via interface gráfica
app.post('/addProject', (req, res) => {
  const { id, name, budget, cost, category_id } = req.body;

  const query = 'INSERT INTO projects (id, name, budget, cost, category_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [id, name, budget, cost, category_id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao adicionar o projeto');
    } else {
      res.status(200).send('Projeto adicionado com sucesso');
    }
  });
});

// Rota para adicionar novos serviços via interface gráfica
app.post('/addService', (req, res) => {
  const { id, name, cost, description, project_id } = req.body;

  const query = 'INSERT INTO services (id, name, cost, description, project_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [id, name, cost, description, project_id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao adicionar o serviço');
    } else {
      res.status(200).send('Serviço adicionado com sucesso');
    }
  });
});

// Iniciar servidor
const port = 5002;
app.listen(port, () => {
  console.log(`Servidor rodando da api na porta ${port}`);
});
