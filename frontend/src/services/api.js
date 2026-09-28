const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function getMunicipios() {
  return fetch(`${API}/municipios`).then(r => r.json());
}

export async function getCriterios() {
  return fetch(`${API}/criterios`).then(r => r.json());
}

export async function executarTOPSIS(weights) {
  return fetch(`${API}/topsis/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weights })
  }).then(r => r.json());
}
