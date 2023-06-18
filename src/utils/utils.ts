import { HammingDistanceSolution, Solution } from "../models/solution";

export function sortByDominance(
  solution1: Solution,
  solution2: Solution
): number {
  return solution1.dominanceRate! - solution2.dominanceRate!;
}

export function sortByHammingDistance(
  solution1: HammingDistanceSolution,
  solution2: HammingDistanceSolution
): number {
  return solution2.hammingDistance - solution1.hammingDistance;
}

export function sortByUtility(
  solution1: Solution,
  solution2: Solution
): number {
  return solution2.utility! - solution1.utility!;
}
