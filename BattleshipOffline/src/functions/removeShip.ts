import type { Dispatch, SetStateAction } from "react";
import type { Ship } from "../types/ShipTypes";
import { handleAddShipAgainToArray } from "./addShipToArray";
import type { Cell } from "../types/CellTypes";

export const removeShipFromBoardOnClick = (
    onSendShipLength: (length: number) => void, 
    ships: Ship[], 
    setBoard: Dispatch<SetStateAction<Cell[][]>>, 
    setShips: Dispatch<SetStateAction<Ship[]>>, 
    shipId: number | undefined) => {

    console.log(shipId);
    setBoard(prev => {
        return prev.map((r) =>
            r.map((c) => {
            const isShip =
            (c.hasShip && c.shipId === shipId)
                ? true
                : false;

            return isShip
                ? { ...c, hasShip: false, shipId: 0 }
                : c;
            
            })
        )
        }
    );
    handleAddShipAgainToArray(setShips, shipId);
    
    if(ships.length === 0 || ships.length === 1){
        onSendShipLength(2); 
    }
    else{
        onSendShipLength(ships.length);
    }
};

export const removeRemainingShipPartsFromBoard = (setBoard: Dispatch<SetStateAction<Cell[][]>>, currentShipId: number) => {
    setBoard(prev => {
        return prev.map((r) =>
        r.map((c) => {
            const isShip =
            (c.hasShip && c.shipId === currentShipId)
                ? true
                : false;

            return isShip
                ? { ...c, hasShip: false, shipId: 0 }
                : c;
            })
        )
        }
    );
};