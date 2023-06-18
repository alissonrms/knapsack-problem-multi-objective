import { Solution } from "../models/solution";

export function rouletteSelection(population: Solution[]): Solution[] {
  function refreshProbabilitiesArray(): number[] {
    return populationCopy.map((solution) => {
      return solution[sortMethod]! / totalFitness;
    });
  }

  const populationCopy = [...population];

  const sortMethod = Math.random() > 0.5 ? "utility" : "price";

  const totalFitness = populationCopy.reduce(
    (sum, solution) => sum + solution[sortMethod]!,
    0
  );
  let selectionProbabilities = refreshProbabilitiesArray();
  const selectedPopulation: Solution[] = [];

  while (selectedPopulation.length < population.length) {
    let cumulativeProbability = 0;
    const randomValue = Math.random();
    selectionProbabilities = refreshProbabilitiesArray();

    for (let i = 0; i < populationCopy.length; i++) {
      cumulativeProbability +=
        sortMethod === "utility"
          ? selectionProbabilities[i]
          : 1 / selectionProbabilities[i];

      if (randomValue <= cumulativeProbability) {
        selectedPopulation.push(populationCopy[i]);
        break;
      }
    }
  }

  return selectedPopulation;
}
