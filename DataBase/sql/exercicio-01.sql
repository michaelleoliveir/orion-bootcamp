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

INSERT INTO cursos (nome_curso) VALUES 
('Análise e Desenvolvimento de Sistemas'),
('Desenvolvimento Fullstack'),
('Segurança da Informação');

INSERT INTO alunos (nome, email, curso_id) VALUES
('Michaelle Oliveira', 'michaelle@orion.com', 2),
('Thiago Duarte', 'thiago@orion.com', 1),
('Tatiana Mendes', 'tatiana@orion.com', 2),
('Francisco Silva', 'chico@orion.com', 3);

SELECT * FROM alunos;

SELECT * FROM cursos;