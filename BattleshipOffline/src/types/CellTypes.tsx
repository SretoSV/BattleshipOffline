export type Cell = {
  hasShip: boolean;
  isHit: boolean;
  shipNextTo: boolean;
  shipId?: number; // za identifikaciju broda
};
