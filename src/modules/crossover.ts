export function crossoverTwoPoints(parent1: number[], parent2: number[]): number[][] {
  const child1: number[] = [];
  const child2: number[] = [];
  const length = parent1.length;

  const point1 = Math.floor(Math.random() * (length - 1)) + 1;
  const point2 = Math.floor(Math.random() * (length - point1)) + point1;

  child1.push(...parent1.slice(0, point1));
  child1.push(...parent2.slice(point1, point2));
  child1.push(...parent1.slice(point2));

  child2.push(...parent2.slice(0, point1));
  child2.push(...parent1.slice(point1, point2));
  child2.push(...parent2.slice(point2));

  return [child1, child2];
}