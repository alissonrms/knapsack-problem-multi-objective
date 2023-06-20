import Config from "./config/config";
import { readItemsFile } from "./modules/data";
import { convertToCrohnDistanceSolutions, createInitialPopulation, generateRandomIndividuals } from "./modules/population";
import { sortByDominance, sortByDominanceAndCrohn, sortByCrohnDistance, sortByUtility, separateSolutionsByDominanceRate, getRandomInt } from "./utils/utils";
import { tournamentSelection } from "./modules/selection";
import { evaluatePopulation, paretoDominance } from "./modules/evaluator";
import { crossoverIndividuals, crossoverOnePoint } from "./modules/crossover";
import { Solution } from "./models/solution";
import { mutateIndividual, mutatePopulation } from "./modules/mutation";

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
      // return Date.now() < startTime + Config.timeToStop;
      return generations < 500;
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

    function manyRepetition(){
      if(utilityHistory.length >= Config.maxRepetition){
        const lastUtility = utilityHistory[utilityHistory.length - 1];
        for(let i = utilityHistory.length - 2; i >= utilityHistory.length - Config.maxRepetition; i--){
          if(utilityHistory[i] !== lastUtility) return false;
        }
        return true;
      }
      return false;
    }
    
    function mutateByFront(){
      const newPopulation: Solution[] = [];
      const paretoFronts = separateSolutionsByDominanceRate(population);

      for(const key in paretoFronts){
        const front = paretoFronts[key];

        for (let i = 0; i < 20; i++) {
          let individualToMutate = getRandomInt(0, front.length - 1);
          front[individualToMutate] = mutateIndividual(front[individualToMutate]);
        }

        newPopulation.push(...front);
      }

      population = newPopulation;
    }

    function verifyHistory(){
      if(Config.populationSize >= Config.maxPopulation) return;
      utilityHistory.push(findIndividualWithMaxUtility(population).utility!);
      if(manyRepetition()){
        console.log("-----------nova população---------")
        mutateByFront();
        utilityHistory = [utilityHistory.length - 1];
        Config.populationSize += Config.individualsToIncrement;
        const newIndividuals = generateRandomIndividuals(Config.individualsToIncrement);
        population.push(...newIndividuals);
        refreshPopulationEvaluation();
      }
    }

    const startTime = Date.now();
    let selectedParents: Solution[] = [];
    let children: Solution[] = [];
    let generations = 0;
    let utilityHistory: number[] = [];
    while (checkTimeToStop()) {
      selectParents();
      crossParents();
      mutateChildren();
      concatChildrenToPopulation();
      refreshPopulationEvaluation();
      adjustPopulationSize();
      console.log(findIndividualWithMaxUtility(population).utility);
      verifyHistory()
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
