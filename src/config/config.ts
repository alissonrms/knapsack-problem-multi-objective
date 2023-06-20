import { Item } from "../models/item";

export default class Config {
  public static items: Item[] = [];
  public static populationSize = 50;
  public static readonly itemsLenght = 500;
  public static readonly randomIndividualsPercentage = 0.04;
  public static readonly knapsackMaxWeight = 30;
  public static readonly timeToStop = 20 * 60 * 1000;
  public static readonly mutationRate = 0.008;
}
