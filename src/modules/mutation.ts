import Config from "../config/config";
import { Solution } from "../models/solution";
import { calculateFitnessSolution } from "./evaluator";

export function mutatePopulation(population: Solution[]): Solution[] {
  const mutatedPopulation = [];
  for(let o in population) {
    for(let i in population[o].chromosome) {
      if(Math.random() < Config.mutationRate) {
        population[o].chromosome[i] = Math.random() > 0.1 ? 0 : 1;
      }
    }

    mutatedPopulation.push(calculateFitnessSolution(population[o].chromosome))
  }

  return mutatedPopulation;
}
