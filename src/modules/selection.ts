import { Solution } from "../models/solution";

export function rouletteSelection(population: Solution[], populationSize: number): Solution[] {
  const sortMethod = Math.random() > 0.5 ? 'utility' : 'price';

  const totalFitness = population.reduce((sum, solution) => sum + solution[sortMethod], 0);
  const selectionProbabilities = population.map(solution => solution[sortMethod] / totalFitness);

  const selectedPopulation: Solution[] = [];
  
  while (selectedPopulation.length < populationSize / 2) {
    let cumulativeProbability = 0;
    const randomValue = Math.random();

    for (let i = 0; i < population.length; i++) {
      cumulativeProbability += selectionProbabilities[i];

      if (randomValue <= cumulativeProbability) {
        selectedPopulation.push(population[i]);
        break;
      }
    }
  }

  return selectedPopulation;
}