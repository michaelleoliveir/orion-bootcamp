SELECT 
    a.nome AS nome_aluno,
    c.nome_curso AS nome_curso
FROM alunos a
INNER JOIN cursos c ON a.curso_id = c.id;

SELECT
    a.nome AS nome_aluno,
    c.nome_curso AS nome_curso
FROM alunos a
INNER JOIN cursos c ON a.curso_id = c.id
WHERE c.nome_curso = 'Desenvolvimento Fullstack';

UPDATE alunos SET nome = 'Ana Maria Braga' WHERE id = 3;

-- EXTRA
SELECT 
    c.nome_curso AS nome_curso
FROM cursos c
LEFT JOIN alunos a ON c.id = a.curso_id
WHERE a.curso_id IS NULL