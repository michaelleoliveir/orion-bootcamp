import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());

async function connectWithRetry(retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        const tempClient = new Client({
            host: process.env.DB_HOST || 'db',
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        try {
            await tempClient.connect();
            console.log('Conectado ao banco de dados');

            await tempClient.query(`
                CREATE TABLE IF NOT EXISTS mensagens (
                id SERIAL PRIMARY KEY,
                conteudo TEXT NOT NULL
                );
            `);

            global.pgClient = tempClient;
            return;
        } catch (err) {
            console.error(`Erro ao conectar (${i + 1}/${retries}): ${err.message}`);
            await new Promise(res => setTimeout(res, delay));
        }
    }

    console.error('Falha ao conectar com o banco após várias tentativas.');
    process.exit(1);
}

await connectWithRetry();

// rotas
app.post('/mensagens', async (req, res) => {
    try {
        const { conteudo } = req.body;
        await global.pgClient.query('INSERT INTO mensagens (conteudo) VALUES ($1)', [conteudo]);
        res.send('Mensagem inserida com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir mensagem:', error.message);
        res.status(500).send('Erro ao inserir mensagem.');
    }
});

app.get('/mensagens', async (req, res) => {
    try {
        const result = await global.pgClient.query('SELECT * FROM mensagens');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error.message);
        res.status(500).send('Erro ao buscar mensagens.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
