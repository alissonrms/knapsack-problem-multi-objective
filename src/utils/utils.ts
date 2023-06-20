import { Solution } from "../models/solution";

export function sortByDominance(
  solution1: Solution,
  solution2: Solution
): number {
  return solution1.dominanceRate! - solution2.dominanceRate!;
}

export function sortByCrohnDistance(
  solution1: Solution,
  solution2: Solution
): number {
  return solution2.crohnDistance! - solution1.crohnDistance!;
}

export function sortByDominanceAndCrohn(
  solution1: Solution,
  solution2: Solution
): number {
  const dominance = solution1.dominanceRate! - solution2.dominanceRate!;
  if(dominance !== 0) return dominance;
  return solution2.crohnDistance! - solution1.crohnDistance!;
}

export function sortByUtility(
  solution1: Solution,
  solution2: Solution
): number {
  return solution2.utility! - solution1.utility!;
}

export function sortByPrice(
  solution1: Solution,
  solution2: Solution
): number {
  return solution1.price! - solution2.price!;
}

// Função para separar as soluções com o mesmo dominanceRate em diferentes grupos
export function separateSolutionsByDominanceRate(solutions: Solution[]) {
  const solutionGroups: { [key: number]: Solution[] } = {};

  for (const solution of solutions) {
    const dominanceRate = solution.dominanceRate!;

    if (!solutionGroups[dominanceRate]) {
      // Se o grupo para o dominanceRate ainda não existe, cria um novo array
      solutionGroups[dominanceRate] = [solution];
    } else {
      // Se o grupo para o dominanceRate já existe, adiciona a solução ao array existente
      solutionGroups[dominanceRate].push(solution);
    }
  }

  return solutionGroups;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min )) + min;
}

