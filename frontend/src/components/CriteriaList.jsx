import React from 'react';
export default function CriteriaList({ criterios = [], weights, setWeights }) {
  return (
    <div className="card">
      <h2>Critérios TOPSIS</h2>
      {criterios.map((c, i) => (
        <div className="criterion" key={c.codigo}>
          <div>
            <strong>{c.codigo}</strong> — {c.nome}
            <small>{c.tipo} · {c.fonte}</small>
          </div>
          <input
            aria-label={`Peso ${c.codigo}`}
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={weights[i]}
            onChange={e => {
              const next = [...weights];
              next[i] = Number(e.target.value);
              setWeights(next);
            }}
          />
        </div>
      ))}
    </div>
  );
}

