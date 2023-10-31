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
	senha_usuario CHAR(64) NOT NULL,
	salt CHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS Votos (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	email_usuario VARCHAR(50) NOT NULL UNIQUE,
	numero_candidato INTEGER NOT NULL,
	FOREIGN KEY (email_usuario) REFERENCES Estudante(email_usuario),
	FOREIGN KEY (numero_candidato) REFERENCES Candidatos(numero_candidato)
);

INSERT INTO Estudante (nome, email_usuario, senha_usuario)
VALUES ('João', 'joao@gamil.com', '2581eceaf58213cfcecd3b83a0edbe01ac866da122fcf66007ae8c0e44ebf54b', 'uAyOL61SiF5izzO5');

INSERT INTO Candidatos (numero_candidato, nome_candidato)
VALUES (1, 'Paulo'),
(2, 'Roberto'),
(3, 'Mario');

-- the database structure --
