import { Solution } from "../models/solution";
import { calculateFitnessSolution } from "./evaluator";

export function crossoverOnePoint(
  parent1: number[],
  parent2: number[]
): number[][] {
  const crossoverPoint = Math.floor(Math.random() * (parent1.length - 1)) + 1;

  const child1 = parent1
    .slice(0, crossoverPoint)
    .concat(parent2.slice(crossoverPoint));
  const child2 = parent2
    .slice(0, crossoverPoint)
    .concat(parent1.slice(crossoverPoint));

  return [child1, child2];
}

export function crossoverIndividuals(individuals: Solution[]): Solution[] {
  const crossoveredIndividuals: Solution[] = [];

  for (let i = 0; i < individuals.length - 1; i += 2) {
    const [child1, child2] = crossoverOnePoint(
      individuals[i].chromosome,
      individuals[i + 1].chromosome
    );

    crossoveredIndividuals.push(calculateFitnessSolution(child1));
    crossoveredIndividuals.push(calculateFitnessSolution(child2));
  }

  return crossoveredIndividuals;
}
