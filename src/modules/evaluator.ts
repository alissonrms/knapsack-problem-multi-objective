import Config from "../config/config";
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
  population: Solution[]
): void {
  population.forEach((solution) => {
    solution = calculateFitnessSolution(solution.chromosome);
  });

  population.forEach((solution) => {
    solution.dominanceRate = 0;
    population.forEach((solutionToCompare) => {
      if (paretoDominance(solution, solutionToCompare) === -1) {
        solution.dominanceRate! += 1;
      }
    });
  });
}

export function calculateFitnessSolution(
  chromosome: number[]
): Solution {
  let price = 0;
  let utility = 0;
  let weight = 0;

  for (let i = 0; i < chromosome.length; i++) {
    if (chromosome[i] === 1) {
      utility += Config.items[i].utility;
      price += Config.items[i].price;
      weight += Config.items[i].weight;
    }
  }

  if (weight > Config.knapsackMaxWeight) {
    return { chromosome, price: 9999999, utility: 0, weight };
  }

  return { chromosome, price, utility, weight };
}
