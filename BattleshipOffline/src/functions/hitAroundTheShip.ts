import type { Dispatch, SetStateAction } from "react";
import type { Cell } from "../types/CellTypes";

export const hitAroundTheShip = (setBoard: Dispatch<SetStateAction<Cell[][]>>, shipIdDropped: number) => {
    
      setBoard(prev => {
        return prev.map((r, rIdx) =>
          r.map((c, cIdx) => {
              if(rIdx === 0 && cIdx === 0){ //ugao1
                if((prev[rIdx][cIdx+1].shipId === shipIdDropped || prev[rIdx+1][cIdx].shipId === shipIdDropped || prev[rIdx+1][cIdx+1].shipId === shipIdDropped) && !c.hasShip){
                    return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(rIdx === 0 && cIdx === 9){ //ugao2
                if((prev[rIdx][cIdx-1].shipId === shipIdDropped || prev[rIdx+1][cIdx-1].shipId === shipIdDropped || prev[rIdx+1][cIdx].shipId === shipIdDropped) && !c.hasShip){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(rIdx === 9 && cIdx === 0){ //ugao3
                if((prev[rIdx-1][cIdx].shipId === shipIdDropped || prev[rIdx-1][cIdx+1].shipId === shipIdDropped || prev[rIdx][cIdx+1].shipId === shipIdDropped) && !c.hasShip){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(rIdx === 9 && cIdx === 9){ //ugao4
                if((prev[rIdx][cIdx-1].shipId === shipIdDropped || prev[rIdx-1][cIdx-1].shipId === shipIdDropped || prev[rIdx-1][cIdx].shipId === shipIdDropped) && !c.hasShip){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(rIdx === 0 && (cIdx >= 1 && cIdx <= 8)){ //prvi red
                if((prev[rIdx][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx+1][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx][cIdx+1].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx+1].shipId === shipIdDropped) && !c.hasShip
                ){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(rIdx === 9 && (cIdx >= 1 && cIdx <= 8)){ //poslednji red
                if((prev[rIdx][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx-1][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx][cIdx+1].shipId === shipIdDropped ||
                   prev[rIdx-1][cIdx].shipId === shipIdDropped ||
                   prev[rIdx-1][cIdx+1].shipId === shipIdDropped) && !c.hasShip
                ){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(cIdx === 0 && (rIdx >= 1 && rIdx <= 8)){ //prva kolona
                if((prev[rIdx-1][cIdx].shipId === shipIdDropped || 
                   prev[rIdx-1][cIdx+1].shipId === shipIdDropped || 
                   prev[rIdx][cIdx+1].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx+1].shipId === shipIdDropped) && !c.hasShip
                ){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(cIdx === 9 && (rIdx >= 1 && rIdx <= 8)){ //poslednja kolona
                if((prev[rIdx-1][cIdx].shipId === shipIdDropped || 
                   prev[rIdx-1][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx][cIdx-1].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx-1].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx].shipId === shipIdDropped) && !c.hasShip
                ){
                  return {...c, shipNextTo: true, isHit: true }
                }
              }
              else if(rIdx >=1 && cIdx >=1 && rIdx <=8 && cIdx <= 8){
                if((prev[rIdx-1][cIdx-1].shipId === shipIdDropped ||
                   prev[rIdx-1][cIdx].shipId === shipIdDropped || 
                   prev[rIdx-1][cIdx+1].shipId === shipIdDropped || 
                   prev[rIdx][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx][cIdx+1].shipId === shipIdDropped ||
                   prev[rIdx+1][cIdx-1].shipId === shipIdDropped || 
                   prev[rIdx+1][cIdx].shipId === shipIdDropped || 
                   prev[rIdx+1][cIdx+1].shipId === shipIdDropped) && !c.hasShip) //!c.hasShip da ne bi polje sa brodom imalo shipNextTo: true
                   {
                    return {...c, shipNextTo: true, isHit: true }
                   }
              }

              return c;
            })
          )
        }
      );

};