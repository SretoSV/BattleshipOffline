import type { Dispatch, SetStateAction } from "react";
import type { Ship } from "../types/ShipTypes";
import { initialShips } from "../constants/ships";

export const handleAddShipAgainToArray = (setShips: Dispatch<SetStateAction<Ship[]>>, shipId: number | undefined) => {
    if (shipId === undefined) return;
    
    const shipToRestore = initialShips.find(ship => ship.id === shipId);
    if (!shipToRestore) return;
    
    setShips(prevShips => {
        const alreadyExists = prevShips.some(ship => ship.id === shipId);
        if (alreadyExists) {
            return prevShips;
        }

        const updated = [...prevShips, shipToRestore].sort((a, b) => b.size - a.size);
        console.log("Updated ships:", updated);
        return updated;
    });
};