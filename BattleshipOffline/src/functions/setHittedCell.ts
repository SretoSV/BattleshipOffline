import type { Dispatch, SetStateAction } from "react";
import type { Cell } from "../types/CellTypes";

export const setHittedCell = (setBoard: Dispatch<SetStateAction<Cell[][]>>, board: Cell[][]) => {
    setBoard(prev => {
        return prev.map((r, rIdx) =>
            r.map((c, cIdx) => {
                if(board[rIdx][cIdx].hasShip)
                    return { ...c, isHit: true, hasShip: true };
                else{
                    return { ...c, isHit: true };
                }
            })
        )
        }
    );
};