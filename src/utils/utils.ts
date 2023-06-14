import { Solution } from "../models/solution";

export function sortByDominance(
  solution1: Solution,
  solution2: Solution
): number {
  return solution1.dominanceRate! - solution2.dominanceRate!;
}
