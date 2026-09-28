import React from 'react';
export default function RankingTable({ ranking = [] }) {
  return (
    <div className="card">
      <h2>Ranking de vulnerabilidade energética</h2>
      <table>
        <thead><tr><th>Posição</th><th>Município</th><th>Ci</th></tr></thead>
        <tbody>
          {ranking.map(item => (
            <tr key={item.index}>
              <td>{item.rank}</td>
              <td>{item.municipio}</td>
              <td>{Number(item.ci).toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
