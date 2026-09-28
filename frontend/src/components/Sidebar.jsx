import React from 'react';

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <h1>Energia+</h1>
      <nav>
        {[
          ["dashboard", "Dashboard"],
          ["topsis", "Simulação TOPSIS"],
          ["municipios", "Municípios"],
          ["criterios", "Critérios"],
          ["mapa", "Mapa"],
          ["historico", "Histórico"]
        ].map(([id, label]) => (
          <button className={page === id ? "active" : ""} onClick={() => setPage(id)} key={id}>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
