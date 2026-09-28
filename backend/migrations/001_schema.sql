CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  senha_hash TEXT NOT NULL,
  perfil VARCHAR(40) NOT NULL DEFAULT 'pesquisador'
);

CREATE TABLE IF NOT EXISTS municipios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  uf CHAR(2) NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  geom GEOMETRY(Point, 4326)
);

CREATE TABLE IF NOT EXISTS criterios (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) UNIQUE NOT NULL,
  nome VARCHAR(200) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('beneficio','custo')),
  fonte VARCHAR(80),
  peso NUMERIC(8,5) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS matriz_decisao (
  id SERIAL PRIMARY KEY,
  municipio_id INTEGER REFERENCES municipios(id),
  criterio_id INTEGER REFERENCES criterios(id),
  valor NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS simulacoes (
  id SERIAL PRIMARY KEY,
  executada_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  pesos JSONB NOT NULL,
  parametros JSONB
);

CREATE TABLE IF NOT EXISTS resultados_ranking (
  id SERIAL PRIMARY KEY,
  simulacao_id INTEGER REFERENCES simulacoes(id),
  municipio_id INTEGER REFERENCES municipios(id),
  distancia_positiva NUMERIC,
  distancia_negativa NUMERIC,
  coeficiente_proximidade NUMERIC,
  posicao INTEGER
);

CREATE INDEX IF NOT EXISTS idx_municipios_geom ON municipios USING GIST (geom);

-- Dados demonstrativos: municípios reais, indicadores sintéticos para fins acadêmicos.
INSERT INTO municipios (nome, uf, latitude, longitude, geom) VALUES
('Salvador','BA',-12.9777,-38.5016,ST_SetSRID(ST_MakePoint(-38.5016,-12.9777),4326)),
('Feira de Santana','BA',-12.2664,-38.9663,ST_SetSRID(ST_MakePoint(-38.9663,-12.2664),4326)),
('Vitória da Conquista','BA',-14.8619,-40.8442,ST_SetSRID(ST_MakePoint(-40.8442,-14.8619),4326)),
('Juazeiro','BA',-9.4162,-40.5033,ST_SetSRID(ST_MakePoint(-40.5033,-9.4162),4326)),
('Barreiras','BA',-12.1528,-44.9903,ST_SetSRID(ST_MakePoint(-44.9903,-12.1528),4326))
ON CONFLICT DO NOTHING;

INSERT INTO criterios (codigo,nome,tipo,fonte,peso) VALUES
('C1','% domicílios sem acesso à eletricidade','custo','IBGE',0.20),
('C2','Capacidade instalada solar (kW/hab)','beneficio','ANEEL',0.15),
('C3','Renda per capita','beneficio','IBGE',0.15),
('C4','Tarifa média de energia (R$/kWh)','custo','ANEEL',0.20),
('C5','Índice de irradiação solar (kWh/m²/dia)','beneficio','INPE',0.10),
('C6','% população em extrema pobreza','custo','IBGE',0.10),
('C7','Nº projetos de energia renovável ativos','beneficio','ANEEL',0.10)
ON CONFLICT (codigo) DO NOTHING;

INSERT INTO matriz_decisao (municipio_id, criterio_id, valor)
SELECT m.id, c.id, v.valor FROM (VALUES
('Salvador','C1',2.0),('Salvador','C2',0.7),('Salvador','C3',2100),('Salvador','C4',0.82),('Salvador','C5',5.3),('Salvador','C6',8.0),('Salvador','C7',12),
('Feira de Santana','C1',4.0),('Feira de Santana','C2',1.1),('Feira de Santana','C3',1450),('Feira de Santana','C4',0.79),('Feira de Santana','C5',5.5),('Feira de Santana','C6',10.0),('Feira de Santana','C7',9),
('Vitória da Conquista','C1',5.0),('Vitória da Conquista','C2',1.4),('Vitória da Conquista','C3',1500),('Vitória da Conquista','C4',0.78),('Vitória da Conquista','C5',5.6),('Vitória da Conquista','C6',9.0),('Vitória da Conquista','C7',10),
('Juazeiro','C1',7.0),('Juazeiro','C2',2.8),('Juazeiro','C3',1300),('Juazeiro','C4',0.76),('Juazeiro','C5',6.2),('Juazeiro','C6',13.0),('Juazeiro','C7',16),
('Barreiras','C1',6.0),('Barreiras','C2',2.2),('Barreiras','C3',1700),('Barreiras','C4',0.77),('Barreiras','C5',6.0),('Barreiras','C6',8.0),('Barreiras','C7',14)
) AS v(municipio,codigo,valor)
JOIN municipios m ON m.nome=v.municipio JOIN criterios c ON c.codigo=v.codigo
WHERE NOT EXISTS (SELECT 1 FROM matriz_decisao md WHERE md.municipio_id=m.id AND md.criterio_id=c.id);
