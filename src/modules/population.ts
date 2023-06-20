import Config from "../config/config";
import { Solution } from "../models/solution";
import { separateSolutionsByDominanceRate, sortByDominance, sortByPrice, sortByUtility } from "../utils/utils";
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
): Solution[] {
  const paretoFronts = separateSolutionsByDominanceRate(solutions);
  const hammingDistanceSolutions: Solution[] = [];

  for (const key in paretoFronts) {
    const front = paretoFronts[key];
    front.sort(sortByUtility);
    front[0].hammingDistance = Number.MAX_VALUE;
    front[front.length - 1].hammingDistance = Number.MAX_VALUE;

    for (let i = 1; i < front.length - 1; i++) {
      if (!front[i].hammingDistance) front[i].hammingDistance = 0;
      let distance =
        (front[i - 1].utility! - front[i + 1].utility!) /
        (front[0].utility! - front[front.length - 1].utility!);
      front[i].hammingDistance! += distance;
    }

    // Adicionar as soluções processadas ao array de saída
    hammingDistanceSolutions.push(...front);
  }

  for (const key in paretoFronts) {
    const front = paretoFronts[key];
    front.sort(sortByPrice);
    front[0].hammingDistance = Number.MAX_VALUE;
    front[front.length - 1].hammingDistance = Number.MAX_VALUE;

    for (let i = 1; i < front.length - 1; i++) {
      if (!front[i].hammingDistance) front[i].hammingDistance = 0;
      let distance =
        (front[i + 1].price! - front[i - 1].price!) /
        (front[front.length - 1].price! - front[0].price!);
      front[i].hammingDistance! += distance;
    }

    // Adicionar as soluções processadas ao array de saída
    hammingDistanceSolutions.push(...front);
  }

  return hammingDistanceSolutions;
}