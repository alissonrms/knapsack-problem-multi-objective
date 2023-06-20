import { Solution } from "../models/solution";

export function tournamentSelection(population: Solution[], tournamentSize: number): Solution[] {
  function getRandomIndex(): number {
    return Math.floor(Math.random() * population.length);
  }

  function selectParent(): Solution {
    let bestSolution: Solution | undefined;
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = getRandomIndex();
      const candidate = population[randomIndex];

      if (!bestSolution || candidate.utility! > bestSolution.utility!) {
        bestSolution = candidate;
      }
    }
    return bestSolution!;
  }

  const selectedPopulation: Solution[] = [];

  while (selectedPopulation.length < population.length) {
    const parent1 = selectParent();
    const parent2 = selectParent();
    selectedPopulation.push(parent1, parent2);
  }

  return selectedPopulation;
}