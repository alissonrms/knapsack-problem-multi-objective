import Config from "../config/config";
import { HammingDistanceSolution, Solution } from "../models/solution";
import { calculateFitnessSolution } from "./evaluator";

export function generateRandomIndividuals(size: number): Solution[] {
  const individuals: Solution[] = [];
  [...Array(size).keys()].forEach(() => {
    const chromosome: number[] = [];

    for (let j = 0; j < Config.itemsLenght; j++) {
      const gene = Math.random() < Config.randomIndividualsPercentage ? 1 : 0;
      chromosome.push(gene);
    }

    individuals.push({ chromosome });
  });

  return individuals;
}

export function createInitialPopulation(): Solution[] {
  return generateRandomIndividuals(Config.populationSize);
}

export function convertToHammingDistanceSolutions(
  solutions: Solution[]
): HammingDistanceSolution[] {
  return solutions.map((currentSolution) => ({
    ...currentSolution,
    hammingDistance: solutions.reduce((distance, compareSolution) => {
      if (currentSolution !== compareSolution) {
        distance += currentSolution.chromosome.reduce((count, value, index) => {
          if (value !== compareSolution.chromosome[index]) {
            count++;
          }
          return count;
        }, 0);
      }
      return distance;
    }, 0),
  }));
}
