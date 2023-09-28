CREATE TABLE cidade (
  codigo varchar(255) DEFAULT NOT,
  cidade varchar
(255) DEFAULT NULL
);
--
-- Índices de tabela 'cidade'
--
ALTER TABLE cidade
  ADD PRIMARY KEY
('codigo');
--
-- Despejando dados para a tabela 'cidade'
--

INSERT INTO cidade
  (codigo, cidade)
VALUES
  ('1', 'São Paulo'),
  ('2', 'Rio de Janeiro'),
  ('3', 'Belo Horizonte'),
  ('4', 'Brasília'),
  ('5', 'Recife');

-- --------------------------------------------------------

--
-- Estrutura para tabela 'events'
--

CREATE TABLE events
(
  title varchar(100) DEFAULT NULL,
  setTime varchar(100) DEFAULT NULL,
  startDate varchar(100) DEFAULT NULL,
  endDate varchar(100) DEFAULT NULL,
  city_code varchar(255) DEFAULT NULL,
  description varchar(100) DEFAULT NULL
);
--
-- Índices de tabela 'events'
--
ALTER TABLE events
  ADD KEY `fk_city_code`
(`city_code`);

--
-- Restrições para tabelas `events`
--
ALTER TABLE events
  ADD CONSTRAINT `fk_city_code` FOREIGN KEY
(`city_code`) REFERENCES `cidade`
(`codigo`);


--
-- Despejando dados para a tabela 'events'
--

INSERT INTO events
  (title, setTime, startDate, endDate, city_code, description)
VALUES
  ('Conferência de Tecnologia', '09:00 - 17:00', '2023-09-20', '2023-09-22', '1', 'Uma conferência sobre as últimas tendências tecnológicas.'),
  ('Festival de Cinema', '18:00 - 23:00', '2023-10-05', '2023-10-10', '2', 'Um festival de cinema internacional com exibições ao ar livre.'),
  ('Exposição de Arte', '10:00 - 18:00', '2023-11-15', '2023-11-20', '3', 'Uma exposição de arte contemporânea com artistas locais.'),
  ('Concerto de Música', '20:00 - 22:00', '2023-12-10', '2023-12-10', '4', 'Um concerto de música clássica com a orquestra local.'),
  ('Feira de Alimentos', '11:00 - 19:00', '2023-08-28', '2023-08-28', '5', 'Uma feira de alimentos com produtos locais e regionais.');