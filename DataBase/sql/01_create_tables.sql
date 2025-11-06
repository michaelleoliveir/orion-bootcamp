CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL
);

CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    curso_id INTEGER REFERENCES cursos(id)
);