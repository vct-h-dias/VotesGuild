DROP DATABASE IF EXISTS GREMIO;
CREATE DATABASE IF NOT EXISTS GREMIO;

USE GREMIO;

CREATE TABLE IF NOT EXISTS Candidatos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	numero_candidato INTEGER NOT NULL UNIQUE,
	nome_candidato VARCHAR(50) NOT NULL,
	votos INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Estudante (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email_usuario VARCHAR(50) NOT NULL UNIQUE,
	email_usuario VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Votos (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email_usuario VARCHAR(50) NOT NULL UNIQUE,
	numero_candidato INTEGER NOT NULL,
	FOREIGN KEY (email_usuario) REFERENCES Candidatos(id),
	FOREIGN KEY (numero_candidato) REFERENCES Candidatos(id)
);

INSERT INTO Estudante (nome, email_usuario, senha_usuario)
VALUES ('João', 'joao@gamil.com', 'senha123'),
('Maria', 'maria@gmail.com','senha123'),
('José', 'jose@gmail.com','senha123');

INSERT INTO Candidatos (numero_candidato, nome_candidato)
VALUES (1, 'Paulo'),
(2, 'Roberto'),
(3, 'Mario');

-- the database structure --
