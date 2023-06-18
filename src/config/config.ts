import { Item } from "../models/item";

export default class Config {
  public static items: Item[] = [];
  public static populationSize = 200;
  public static readonly itemsLenght = 500;
  public static readonly randomIndividualsPercentage = 0.02;
  public static readonly knapsackMaxWeight = 30;
  public static readonly secondsToStop = 10 * 1000;
  public static readonly mutationRate = 0.005;
}
