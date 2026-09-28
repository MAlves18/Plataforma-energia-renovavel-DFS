export function normalize(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return [];
  const columns = matrix[0].length;
  const denominators = Array.from({ length: columns }, (_, j) =>
    Math.sqrt(matrix.reduce((sum, row) => sum + Number(row[j]) ** 2, 0))
  );
  return matrix.map(row =>
    row.map((value, j) => denominators[j] === 0 ? 0 : Number(value) / denominators[j])
  );
}

export function topsis(matrix, weights, types) {
  if (!matrix.length) return [];
  if (matrix[0].length !== weights.length || weights.length !== types.length) {
    throw new Error("Matriz, pesos e tipos devem possuir o mesmo número de critérios.");
  }

  const normalized = normalize(matrix);
  const weighted = normalized.map(row =>
    row.map((value, j) => value * Number(weights[j]))
  );

  const idealPositive = [];
  const idealNegative = [];

  for (let j = 0; j < weights.length; j++) {
    const column = weighted.map(row => row[j]);
    if (types[j] === "beneficio") {
      idealPositive.push(Math.max(...column));
      idealNegative.push(Math.min(...column));
    } else {
      idealPositive.push(Math.min(...column));
      idealNegative.push(Math.max(...column));
    }
  }

  const results = weighted.map((row, index) => {
    const dPlus = Math.sqrt(row.reduce((sum, value, j) => sum + (value - idealPositive[j]) ** 2, 0));
    const dMinus = Math.sqrt(row.reduce((sum, value, j) => sum + (value - idealNegative[j]) ** 2, 0));
    const ci = (dPlus + dMinus) === 0 ? 0 : dMinus / (dPlus + dMinus);
    return { index, dPlus, dMinus, ci };
  });

  return results
    .sort((a, b) => b.ci - a.ci)
    .map((item, position) => ({ ...item, rank: position + 1 }));
}
