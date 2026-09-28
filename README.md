# Plataforma de Vulnerabilidade Social Energética

Projeto acadêmico baseado no roteiro da atividade, com foco na análise multicritério de vulnerabilidade social relacionada ao acesso, uso e impacto de energias renováveis.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Banco: PostgreSQL + PostGIS
- TOPSIS implementado no backend
- Swagger/OpenAPI
- Jest/Supertest
- Docker Compose

## Estrutura
```text
plataforma-energia-renovavel/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   │   └── topsis.service.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   ├── tests/
│   ├── migrations/
│   └── package.json
├── docs/
│   ├── requisitos/
│   ├── uml/
│   ├── api/
│   └── manual-usuario/
├── docker-compose.yml
└── README.md
```

## Execução rápida com Docker
```bash
docker compose up --build
```

Frontend: http://localhost:5173  
API: http://localhost:3000  
Swagger: http://localhost:3000/docs

## Execução local
Backend:
```bash
cd backend
npm install
npm test
npm start
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## TOPSIS
A aplicação utiliza normalização vetorial, aplicação dos pesos, definição das soluções ideais positiva e negativa, cálculo das distâncias euclidianas e coeficiente de proximidade:

`Ci = D- / (D+ + D-)`

Quanto maior o Ci, maior a proximidade da solução ideal positiva dentro da configuração de critérios utilizada.

## Critérios
C1 — % domicílios sem acesso à eletricidade — Custo  
C2 — Capacidade instalada solar (kW/hab) — Benefício  
C3 — Renda per capita — Benefício  
C4 — Tarifa média de energia (R$/kWh) — Custo  
C5 — Índice de irradiação solar (kWh/m²/dia) — Benefício  
C6 — % população em extrema pobreza — Custo  
C7 — Nº projetos de energia renovável ativos — Benefício

O sistema inclui os sete critérios no cadastro e permite configurar pesos e tipos de critério.

## Observação
Os dados de demonstração são fictícios/sintéticos, exceto quando explicitamente identificados como exemplo do roteiro. O sistema está preparado para importação posterior de dados IBGE/ANEEL e para dados georreferenciados.

> Os indicadores incluídos no seed são **sintéticos/demonstrativos**. Não devem ser apresentados como estatísticas oficiais dos municípios.
