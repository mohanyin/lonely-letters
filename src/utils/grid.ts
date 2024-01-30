export function parseIndex(index: number) {
  return {
    x: index % 4,
    y: Math.floor(index / 4),
  };
}

export function isAdjacentTile(index1: number, index2: number) {
  const pos1 = parseIndex(index1);
  const pos2 = parseIndex(index2);
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) === 1;
}
