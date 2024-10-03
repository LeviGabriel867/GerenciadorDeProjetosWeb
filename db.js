import express from 'express';
import mysql from 'mysql2/promise';
import { promises as fs } from 'fs';

const app = express();
app.use(express.json());

async function startServer() {
  try {
    // Criar conexão com o banco de dados
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '1234', // sua senha aqui
      database: 'gerenciadorProjetos',
    });

    console.log('Conectado ao banco de dados com sucesso');

    // Função para ler o arquivo db.json
    async function readDbJson() {
      try {
        const data = await fs.readFile('db.json', 'utf-8');
        return JSON.parse(data);
      } catch (err) {
        console.error('Erro ao ler db.json:', err);
        return { projects: [] }; // Retorna um objeto vazio caso o arquivo não exista
      }
    }

    // Rota para inserir um novo projeto no banco de dados e no db.json
    app.post('/projects', async (req, res) => {
      const { name, budget, cost, category_id } = req.body;

      const query = 'INSERT INTO projects (name, budget, cost, category_id) VALUES (?, ?, ?, ?)';

      try {
        const [result] = await connection.query(query, [name, budget, cost, category_id]);

        // Atualizar o arquivo db.json após adicionar no banco de dados
        const dbData = await readDbJson();
        dbData.projects.push({ id: result.insertId, name, budget, cost, category_id });

        await fs.writeFile('db.json', JSON.stringify(dbData, null, 2));

        res.status(201).send({ message: 'Projeto inserido no banco de dados e atualizado no db.json', id: result.insertId });
      } catch (err) {
        console.error('Erro ao inserir projeto no banco de dados:', err);
        res.status(500).send('Erro ao inserir o projeto');
      }
    });

    // Iniciar o servidor
    app.listen(5001, () => {
      console.log('Servidor rodando na porta 5001');
    });
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
}

// Iniciar o servidor e a conexão com o banco de dados
startServer();
