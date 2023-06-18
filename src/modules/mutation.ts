import Config from "../config/config";
import { Solution } from "../models/solution";

function raffleNumbers(numbersToRaffle: number, range: number): number[] {
  return Array.from({ length: numbersToRaffle }, () => Math.floor(Math.random() * range));
}

export function mutatePopulation(population: Solution[]): Solution[] {
  const mutatedPopulation = population.map(solution => {
    solution.chromosome = solution.chromosome.map(chromosome => {
      if(Math.random() > Config.mutationRate) {
        return Math.random() > 0.01 ? 0 : 1;
      }
      return chromosome
    })
    return solution;
  })

  return mutatedPopulation;
}
