export interface Solution {
  chromosome: number[];
  price?: number;
  utility?: number;
  weight?: number;
  dominanceRate?: number;
  crohnDistance?: number;
}