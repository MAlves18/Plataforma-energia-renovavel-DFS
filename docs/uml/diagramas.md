# UML — descrição dos diagramas

## Casos de uso
- UC01 Cadastrar município
- UC02 Configurar critérios TOPSIS
- UC03 Executar TOPSIS
- UC04 Gerar relatório

## Classes
- Municipio
- Criterio
- MatrizDecisao
- SimulacaoTOPSIS
- ResultadoRanking

## Sequência
Frontend → API → TopsisService → normalização → ponderação → ideal positiva/negativa → distâncias → proximidade → persistência → ranking → frontend.

## Atividade
Selecionar alternativas → critérios/pesos → matriz → normalizar → aplicar pesos → A+ → A− → distâncias → Ci → ranking → resultados.

## Componentes
SPA React → API Node/Express → PostgreSQL/PostGIS.

## Implantação
Navegador → servidor de aplicação → banco PostgreSQL/PostGIS.
