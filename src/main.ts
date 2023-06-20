import Config from "./config/config";
import { readItemsFile } from "./modules/data";
import { evaluatePopulation, paretoDominance } from "./modules/evaluator";
import { convertToCrohnDistanceSolutions, createInitialPopulation } from "./modules/population";
import { sortByDominance, sortByDominanceAndCrohn, sortByCrohnDistance, sortByUtility } from "./utils/utils";
import { tournamentSelection } from "./modules/selection";
import { crossoverIndividuals, crossoverOnePoint } from "./modules/crossover";
import { Solution } from "./models/solution";
import { mutatePopulation } from "./modules/mutation";

async function main() {
  function findIndividualWithMaxUtility(population: Solution[]) {
    let maxUtilityIndividual = population[0];
    population.forEach(solution => {
      if (solution.utility! > maxUtilityIndividual.utility!) {
        maxUtilityIndividual = solution;
      }
    })
    return maxUtilityIndividual;
  }

  function loop() {
    function checkTimeToStop(): boolean {
      return Date.now() < startTime + Config.timeToStop;
    }

    function selectParents() {
      selectedParents = tournamentSelection(population, 3);
      // console.log(selectedParents.map(parent => parent.utility).join('-'));
    }

    function crossParents() {
      children = crossoverIndividuals(selectedParents);
    }

    function mutateChildren() {
      children = mutatePopulation(children);
    }

    function concatChildrenToPopulation() {
      population.push(...children);
    }

    function refreshPopulationEvaluation() {
      population = evaluatePopulation(population);
    }

    function sortPopulationByDominance() {
      population.sort(sortByDominance);
    }

    function sortPopulationByUtility() {
      population.sort(sortByUtility);
    }

    function adjustPopulationSize() {
      const newPopulation = convertToCrohnDistanceSolutions(population);
      newPopulation.sort(sortByDominanceAndCrohn)

      population = newPopulation.slice(0, Config.populationSize);
    }

    const startTime = Date.now();
    let selectedParents: Solution[] = [];
    let children: Solution[] = [];
    let generations = 0;
    while (checkTimeToStop()) {
      selectParents();
      crossParents();
      mutateChildren();
      concatChildrenToPopulation();
      refreshPopulationEvaluation();
      population.sort(sortByDominance);
      adjustPopulationSize();
      console.log(findIndividualWithMaxUtility(population).utility);
      generations++;
    }
    console.log(`Gerações: ${generations}`);
  }

  Config.items = await readItemsFile("src/assets/items.csv");
  let population = createInitialPopulation();
  population = evaluatePopulation(population);
  loop();
}

main();
