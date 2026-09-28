export const criterios = [
  { id: 1, codigo: "C1", nome: "% domicílios sem acesso à eletricidade", tipo: "custo", fonte: "IBGE", peso: 0.20 },
  { id: 2, codigo: "C2", nome: "Capacidade instalada solar (kW/hab)", tipo: "beneficio", fonte: "ANEEL", peso: 0.15 },
  { id: 3, codigo: "C3", nome: "Renda per capita", tipo: "beneficio", fonte: "IBGE", peso: 0.15 },
  { id: 4, codigo: "C4", nome: "Tarifa média de energia (R$/kWh)", tipo: "custo", fonte: "ANEEL", peso: 0.20 },
  { id: 5, codigo: "C5", nome: "Índice de irradiação solar (kWh/m²/dia)", tipo: "beneficio", fonte: "INPE", peso: 0.10 },
  { id: 6, codigo: "C6", nome: "% população em extrema pobreza", tipo: "custo", fonte: "IBGE", peso: 0.10 },
  { id: 7, codigo: "C7", nome: "Nº projetos de energia renovável ativos", tipo: "beneficio", fonte: "ANEEL", peso: 0.10 }
];

export const municipios = [
  { id: 1, nome: "Município A", uf: "BA", latitude: -12.97, longitude: -38.50 },
  { id: 2, nome: "Município B", uf: "BA", latitude: -12.95, longitude: -38.45 },
  { id: 3, nome: "Município C", uf: "BA", latitude: -13.00, longitude: -38.55 }
];

export const matriz = [
  [15, 0.8, 980, 0.75, 5.2, 12, 3],
  [5, 2.1, 1850, 0.62, 5.8, 6, 8],
  [22, 0.3, 650, 0.89, 4.9, 18, 1]
];

export const simulacoes = [];
