import { Item } from "../models/item";

export default class Config {
  public static items: Item[] = [];
  public static populationSize = 500;
  public static readonly itemsLenght = 500;
  public static readonly randomIndividualsPercentage = 0.04;
  public static readonly knapsackMaxWeight = 30;
  public static readonly timeToStop = 2 * 60 * 1000;
  public static readonly mutationRate = 0.05;
  public static readonly maxPopulation = 2000;
  public static readonly individualsToIncrement = 100;
  public static readonly maxRepetition = 30;
}
