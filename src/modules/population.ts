import Config from "../config/config";
import { Solution } from "../models/solution";
import { separateSolutionsByDominanceRate, sortByDominance, sortByPrice, sortByUtility } from "../utils/utils";
import { calculateFitnessSolution } from "./evaluator";

export function generateRandomIndividuals(size: number): Solution[] {
  const individuals: Solution[] = [];

  function newChromosome(): number[]{
    const chromosome: number[] = [];
  
    for (let j = 0; j < Config.itemsLenght; j++) {
      const gene = Math.random() > Config.randomIndividualsPercentage ? 0 : 1;
      chromosome.push(gene);
    }
  
    if(calculateFitnessSolution(chromosome).utility === 0){
      return newChromosome()
    }
  
    return chromosome;
  }

  [...Array(size).keys()].forEach(() => {
    individuals.push({ chromosome: newChromosome() })
  });

  return individuals;
}

export function createInitialPopulation(): Solution[] {
  return generateRandomIndividuals(Config.populationSize);
}

export function convertToCrohnDistanceSolutions(
  solutions: Solution[]
): Solution[] {
  const paretoFronts = separateSolutionsByDominanceRate(solutions);
  const crohnDistanceSolutions: Solution[] = [];

  for (const key in paretoFronts) {
    const front = paretoFronts[key];
    front.sort(sortByUtility);
    front[0].crohnDistance = Number.MAX_VALUE;
    front[front.length - 1].crohnDistance = Number.MAX_VALUE;

    for (let i = 1; i < front.length - 1; i++) {
      if (!front[i].crohnDistance) front[i].crohnDistance = 0;
      let distance =
        (front[i - 1].utility! - front[i + 1].utility!) /
        (front[0].utility! - front[front.length - 1].utility!);
      front[i].crohnDistance! += distance;
    }

    // Adicionar as soluções processadas ao array de saída
    crohnDistanceSolutions.push(...front);
  }

  for (const key in paretoFronts) {
    const front = paretoFronts[key];
    front.sort(sortByPrice);
    front[0].crohnDistance = Number.MAX_VALUE;
    front[front.length - 1].crohnDistance = Number.MAX_VALUE;

    for (let i = 1; i < front.length - 1; i++) {
      if (!front[i].crohnDistance) front[i].crohnDistance = 0;
      let distance =
        (front[i + 1].price! - front[i - 1].price!) /
        (front[front.length - 1].price! - front[0].price!);
      front[i].crohnDistance! += distance;
    }

    // Adicionar as soluções processadas ao array de saída
    crohnDistanceSolutions.push(...front);
  }

  return crohnDistanceSolutions;
}