import { createReadStream } from "fs";
import { Item } from "../models/item";
import csvParser from "csv-parser";
import path from "path";

export function readItemsFile(filePath: string): Promise<Item[]> {
  const relativeFilePath = createRelativeFilePath(filePath);
  return new Promise((resolve, reject) => {
    const items: Item[] = [];
    createReadStream(relativeFilePath)
      .pipe(csvParser({ separator: ";" }))
      .on("data", (data: any) => {
        items.push(createItemByCSVData(data));
      })
      .on("end", () => {
        resolve(items);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

function createRelativeFilePath(filePath: string) {
  return path.resolve(__dirname, `../../${filePath}`);
}

function createItemByCSVData(CSVData: any): Item {
  const { item, Peso, Utilidade, Preco } = CSVData;
  return {
    id: parseInt(item),
    weight: parseFloat(Peso.replace(",", ".")),
    utility: parseInt(Utilidade),
    price: parseFloat(Preco.replace(",", ".")),
  };
}
