import { readItemsFile } from "./modules/data";
import { evaluatePopulation } from "./modules/evaluator";
import { createInitialPopulation } from "./modules/population";

async function main() {
  const items = await readItemsFile("src/assets/items.csv");
  const population = createInitialPopulation();
  console.log(evaluatePopulation(population, items));
}

main();
