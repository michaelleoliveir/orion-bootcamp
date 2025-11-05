import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());

// configuração do cliente do postgres
const client = new Client({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// conecta com o banco de dados e cria tabela
client.connect()
    .then(async () => {
        console.log('Conectado ao banco de dados');

        await client.query(`
            CREATE TABLE IF NOT EXISTS mensagens (
            id SERIAL PRIMARY KEY,
            conteudo TEXT NOT NULL
            );
        `);
    })
    .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

// rota para inserir mensagem
app.post('/mensagens', async (req, res) => {
    const { conteudo } = req.body;
    await client.query('INSERT INTO mensagens (conteudo) VALUES ($1)', [conteudo]);
    res.send('A mensagem foi inserida');
});

// rota para listar mensagens
app.get('/mensagens', async (req, res) => {
    const result = await client.query('SELECT * FROM mensagens');
    res.json(result.rows);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
