import React from 'react';
export default function MunicipiosPage({ municipios }) {
  return (
    <div className="card">
      <h2>Municípios / comunidades</h2>
      <table>
        <thead><tr><th>Nome</th><th>UF</th><th>Latitude</th><th>Longitude</th></tr></thead>
        <tbody>{municipios.map(m => <tr key={m.id}><td>{m.nome}</td><td>{m.uf}</td><td>{m.latitude}</td><td>{m.longitude}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

