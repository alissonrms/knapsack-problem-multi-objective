import { knapsackMaxWeight } from "../config/config";
import { Item } from "../models/item";
import { Solution } from "../models/solution";

function paretoDominance(solution1: Solution, solution2: Solution): number {
  if (
    solution1.utility > solution2.utility &&
    solution1.price < solution2.price
  ) {
    return 1; // solution1 domina solution2
  } else if (
    solution1.utility < solution2.utility &&
    solution1.price > solution2.price
  ) {
    return -1; // solution2 domina solution1
  } else {
    return 0; // soluções não dominantes
  }
}

export function evaluatePopulation(
  population: number[][],
  items: Item[]
): Solution[] {
  const evaluatedPopulation: Solution[] = [];

  for (const chromosome of population) {
    const solution = calculateFitnessSolution(chromosome, items);

    let isDominated = false;

    for (const evaluatedSolution of evaluatedPopulation) {
      const dominance = paretoDominance(solution, evaluatedSolution);

      if (dominance === -1) {
        isDominated = true;
        break;
      }
    }

    if (!isDominated) {
      evaluatedPopulation.push(solution);
    }
  }

  return evaluatedPopulation;
}

function calculateFitnessSolution(
  chromosome: number[],
  items: Item[]
): Solution {
  let price = 0;
  let utility = 0;
  let weight = 0;

  for (let i = 0; i < chromosome.length; i++) {
    if (chromosome[i] === 1) {
      utility += items[i].utility;
      price += items[i].price;
      weight += items[i].weight;
    }
  }

  if (weight > knapsackMaxWeight) {
    return { chromosome, price: 9999999, utility: 0, weight };
  }

  return { chromosome, price, utility, weight };
}
