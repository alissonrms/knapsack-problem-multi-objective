import Config from "../config/config";
import { Solution } from "../models/solution";
import { calculateFitnessSolution } from "./evaluator";

export function generateRandomIndividuals(size: number): Solution[] {
    const individuals: Solution[] = [];
    [...Array(size).keys()].forEach(() => {
        const chromosome: number[] = [];

        for (let j = 0; j < Config.itemsLenght; j++) {
            const gene = Math.random() < Config.randomIndividualsPercentage ? 1 : 0;
            chromosome.push(gene);
        }

        individuals.push(calculateFitnessSolution(chromosome));
    });

    return individuals;
}

export function createInitialPopulation(): Solution[] {
  return generateRandomIndividuals(Config.populationSize);
} 
