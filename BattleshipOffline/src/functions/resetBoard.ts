import type { Dispatch, SetStateAction } from "react";
import type { Cell } from "../types/CellTypes";

export const resetBoard = (setBoard: Dispatch<SetStateAction<Cell[][]>>) => {
    setBoard(prev => {
        return prev.map((r) =>
            r.map((c) => {
                return { ...c, isHit: false, hasShip: false, shipNextTo: false, shipId: 0 };
            })
        )
        }
    );
};