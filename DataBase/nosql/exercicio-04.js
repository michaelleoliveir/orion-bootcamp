import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db('blog');
        const posts = db.collection('posts');

        await posts.updateOne(
            { titulo: 'Cada vez mais complexo' },
            {
                $set: {
                    comentarios: [
                        { autor: 'maria123', conteudo: 'Que post incrível!', data: new Date() },
                        { autor: 'joao123', conteudo: 'Mandou muito bem', data: new Date() }
                    ]
                }
            }
        );

        const noSqlPosts = await posts.find({ tags: 'nosql' }).toArray();
        console.log('Foram encontrados os seguintes posts com a tag "NoSQL": ', noSqlPosts);

        const autorPosts = await posts.find({ autor: 'hi_mikl' }).toArray();
        console.log('Posts do autor hi_mikl: ', autorPosts);

    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
    } finally {
        await client.close();
    }
}

main();