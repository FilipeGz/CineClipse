-- Tabela de usuários/produtores
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  senha_hash VARCHAR(150) NOT NULL,
  avatar_url VARCHAR(250),
  tipo_usuario VARCHAR(20) DEFAULT 'produtor',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de filmes cadastrados (veja o tipo do produtor_id agora!)
CREATE TABLE filmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produtor_id INT NOT NULL,
  titulo VARCHAR(120) NOT NULL,
  descricao TEXT,
  midia_url VARCHAR(300),
  midia_tipo VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (produtor_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de mídias do filme
CREATE TABLE filmes_midias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filme_id INT NOT NULL,
  arquivo_url VARCHAR(300),
  tipo VARCHAR(20),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (filme_id) REFERENCES filmes(id) ON DELETE CASCADE
);

CREATE TABLE avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
