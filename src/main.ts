import Config from "./config/config";
import { readItemsFile } from "./modules/data";
import { evaluatePopulation } from "./modules/evaluator";
import { convertToCrohnDistanceSolutions, createInitialPopulation, generateRandomIndividuals } from "./modules/population";
import { sortByDominance, sortByDominanceAndCrohn, sortByUtility } from "./utils/utils";
import { tournamentSelection } from "./modules/selection";
import { crossoverIndividuals } from "./modules/crossover";
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
      return Date.now() < startTime + Config.timeToStop || findIndividualWithMaxUtility(population).utility === 21312;
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

    function adjustPopulationSize() {
      const newPopulation = convertToCrohnDistanceSolutions(population);
      newPopulation.sort(sortByDominanceAndCrohn)

      population = newPopulation.slice(0, Config.populationSize);
    }

    function checkToIncreaseRandomIdividuals() {
      if(findIndividualWithMaxUtility(population).utility === lastBestSolution) {
        sameBestSolutionCounter++;
        if(sameBestSolutionCounter === 200) {
          population.push(...generateRandomIndividuals(Math.round(Config.populationSize * 0.5)))
          Config.populationSize = population.length;
          sameBestSolutionCounter = 0;
          console.log('aumentando populaçao ' + population.length);
        }
        return;
      }
      sameBestSolutionCounter = 0;
    }

    const startTime = Date.now();
    let selectedParents: Solution[] = [];
    let children: Solution[] = [];
    let generations = 0;
    let sameBestSolutionCounter = 0;
    let lastBestSolution = 0;

    while (checkTimeToStop()) {
      lastBestSolution = findIndividualWithMaxUtility(population).utility!;
      selectParents();
      crossParents();
      mutateChildren();
      concatChildrenToPopulation();
      refreshPopulationEvaluation();
      adjustPopulationSize();
      console.log(findIndividualWithMaxUtility(population).utility);
      checkToIncreaseRandomIdividuals();
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
