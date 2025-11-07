import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db('blog');
        const posts = db.collection('posts');

        await posts.insertOne({
            titulo: 'Mergulhando no MongoDB através do Orion Bootcamp!',
            autor: 'Michaelle Oliveira',
            conteudo: 'Estou muito animada para aprender a usar novos banco de dados...'
        });

        await posts.insertOne({
            titulo: 'Cada vez mais complexo',
            autor: 'hi_mikl',
            conteudo: 'Testando a flexibilidade do MongoDB na inserção de dados',
            tags: ['nosql', 'mongodb', 'orion', 'newrizon']
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
