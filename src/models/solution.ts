export interface Solution {
  chromosome: number[];
  price?: number;
  utility?: number;
  weight?: number;
  dominanceRate?: number;
}

export interface HammingDistanceSolution extends Solution {
  hammingDistance: number;
}