import { readItemsFile } from "./modules/data";
import { evaluatePopulation } from "./modules/evaluator";
import { createInitialPopulation } from "./modules/population";
import { sortByDominance } from "./utils/utils";
import Config from "./config/config";

async function main() {
  Config.items = await readItemsFile("src/assets/items.csv");
  const population = createInitialPopulation();
  evaluatePopulation(population);
  console.log(population.sort(sortByDominance).slice(0, 10));
}

main();
