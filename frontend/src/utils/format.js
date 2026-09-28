export function percent(value) {
  return `${(Number(value) * 100).toFixed(2)}%`;
}

export function decimal(value) {
  return Number(value).toFixed(4);
}
