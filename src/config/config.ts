import { Item } from "../models/item";
export default class Config {
  public static items: Item[] = [];
  public static populationSize = 200;
  public static readonly itemsLenght = 500;
  public static readonly randomIndividualsPercentage = 0.03;
  public static readonly knapsackMaxWeight = 30;
}
