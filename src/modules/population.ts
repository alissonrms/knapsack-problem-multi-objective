import { itemsLenght, populationSize, randomIndividualsPercentage } from "../config/config";

export function generateRandomIndividuals(size: number): number[][] {
    const individuals: number[][] = [];
    [...Array(size).keys()].forEach(() => {
        const individual: number[] = [];

        for (let j = 0; j < itemsLenght; j++) {
            const gene = Math.random() < randomIndividualsPercentage ? 1 : 0;
            individual.push(gene);
        }

        individuals.push(individual);
    });

    return individuals;
}

export function createInitialPopulation(): number[][] {
  return generateRandomIndividuals(populationSize);
} 
