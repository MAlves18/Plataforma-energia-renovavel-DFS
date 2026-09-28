import React from 'react';
export default function CriteriaPage({ criterios }) {
  return (
    <div className="card">
      <h2>Cadastro de critérios</h2>
      <table>
        <thead><tr><th>Código</th><th>Critério</th><th>Tipo</th><th>Fonte</th><th>Peso</th></tr></thead>
        <tbody>{criterios.map(c => <tr key={c.id}><td>{c.codigo}</td><td>{c.nome}</td><td>{c.tipo}</td><td>{c.fonte}</td><td>{c.peso}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

