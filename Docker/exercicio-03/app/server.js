import express from 'express';

const app = express();
const PORT = 3000;

// rota raiz que responde com o "Hello from DOCKER"
app.get('/', (req, res) => {
    res.send('Hello from DOCKER!')
});

// inicia o servidor na porta 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})