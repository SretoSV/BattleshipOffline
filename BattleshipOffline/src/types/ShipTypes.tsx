export type Ship = {
  id: number;
  size: number;
  orientation: "horizontal" | "vertical";
  position?: { x: number; y: number };
  hitCounter: number;
};

