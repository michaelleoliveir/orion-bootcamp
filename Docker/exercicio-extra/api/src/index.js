import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// conexão com o banco
const client = new Client({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
});

client.connect()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar com o banco de dados:', err.message));

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
