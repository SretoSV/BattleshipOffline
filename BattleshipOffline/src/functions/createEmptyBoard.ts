import type { Cell } from "../types/CellTypes";

export const createEmptyBoard = (): Cell[][] =>
  Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      hasShip: false,
      isHit: false,
      shipNextTo: false,
      shipId: 0,
    }))
);