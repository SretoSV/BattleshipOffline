import type { Dispatch, SetStateAction } from "react";
import type { Cell } from "../types/CellTypes";

export const addNextToShip = (setBoard: Dispatch<SetStateAction<Cell[][]>>) => {
    setBoard(prev => {
        return prev.map((r, rIdx) =>
          r.map((c, cIdx) => {
              if(rIdx === 0 && cIdx === 0){ //ugao1
                if((prev[rIdx][cIdx+1].hasShip || prev[rIdx+1][cIdx].hasShip || prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip){
                  return {...c, shipNextTo: true }
                }
              }
              else if(rIdx === 0 && cIdx === 9){ //ugao2
                if((prev[rIdx][cIdx-1].hasShip || prev[rIdx+1][cIdx-1].hasShip || prev[rIdx+1][cIdx].hasShip) && !c.hasShip){
                  return {...c, shipNextTo: true }
                }
              }
              else if(rIdx === 9 && cIdx === 0){ //ugao3
                if((prev[rIdx-1][cIdx].hasShip || prev[rIdx-1][cIdx+1].hasShip || prev[rIdx][cIdx+1].hasShip) && !c.hasShip){
                  return {...c, shipNextTo: true }
                }
              }
              else if(rIdx === 9 && cIdx === 9){ //ugao4
                if((prev[rIdx][cIdx-1].hasShip || prev[rIdx-1][cIdx-1].hasShip || prev[rIdx-1][cIdx].hasShip) && !c.hasShip){
                  return {...c, shipNextTo: true }
                }
              }
              else if(rIdx === 0 && (cIdx >= 1 && cIdx <= 8)){ //prvi red
                if((prev[rIdx][cIdx-1].hasShip || 
                   prev[rIdx+1][cIdx-1].hasShip || 
                   prev[rIdx][cIdx+1].hasShip ||
                   prev[rIdx+1][cIdx].hasShip ||
                   prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip
                ){
                  return {...c, shipNextTo: true }
                }
              }
              else if(rIdx === 9 && (cIdx >= 1 && cIdx <= 8)){ //poslednji red
                if((prev[rIdx][cIdx-1].hasShip || 
                   prev[rIdx-1][cIdx-1].hasShip || 
                   prev[rIdx][cIdx+1].hasShip ||
                   prev[rIdx-1][cIdx].hasShip ||
                   prev[rIdx-1][cIdx+1].hasShip) && !c.hasShip
                ){
                  return {...c, shipNextTo: true }
                }
              }
              else if(cIdx === 0 && (rIdx >= 1 && rIdx <= 8)){ //prva kolona
                if((prev[rIdx-1][cIdx].hasShip || 
                   prev[rIdx-1][cIdx+1].hasShip || 
                   prev[rIdx][cIdx+1].hasShip ||
                   prev[rIdx+1][cIdx].hasShip ||
                   prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip
                ){
                  return {...c, shipNextTo: true }
                }
              }
              else if(cIdx === 9 && (rIdx >= 1 && rIdx <= 8)){ //poslednja kolona
                if((prev[rIdx-1][cIdx].hasShip || 
                   prev[rIdx-1][cIdx-1].hasShip || 
                   prev[rIdx][cIdx-1].hasShip ||
                   prev[rIdx+1][cIdx-1].hasShip ||
                   prev[rIdx+1][cIdx].hasShip) && !c.hasShip
                ){
                  return {...c, shipNextTo: true }
                }
              }
              else if(rIdx >=1 && cIdx >=1 && rIdx <=8 && cIdx <= 8){
                if((prev[rIdx-1][cIdx-1].hasShip ||
                   prev[rIdx-1][cIdx].hasShip || 
                   prev[rIdx-1][cIdx+1].hasShip || 
                   prev[rIdx][cIdx-1].hasShip || 
                   prev[rIdx][cIdx+1].hasShip ||
                   prev[rIdx+1][cIdx-1].hasShip || 
                   prev[rIdx+1][cIdx].hasShip || 
                   prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip) //!c.hasShip da ne bi polje sa brodom imalo shipNextTo: true
                   {
                    return {...c, shipNextTo: true }
                   }
              }

              return c;
            })
          )
        }
    );
};

export const removeNextToShip = (setBoard: Dispatch<SetStateAction<Cell[][]>>) => {
  setBoard(prev => {
    return prev.map((r, rIdx) =>
      r.map((c, cIdx) => {
          if(rIdx === 0 && cIdx === 0){ //ugao1
            if((!prev[rIdx][cIdx+1].hasShip && !prev[rIdx+1][cIdx].hasShip && !prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip){
              return {...c, shipNextTo: false }
            }
          }
          else if(rIdx === 0 && cIdx === 9){ //ugao2
            if((!prev[rIdx][cIdx-1].hasShip && !prev[rIdx+1][cIdx-1].hasShip && !prev[rIdx+1][cIdx].hasShip) && !c.hasShip){
              return {...c, shipNextTo: false }
            }
          }
          else if(rIdx === 9 && cIdx === 0){ //ugao3
            if((!prev[rIdx-1][cIdx].hasShip && !prev[rIdx-1][cIdx+1].hasShip && !prev[rIdx][cIdx+1].hasShip) && !c.hasShip){
              return {...c, shipNextTo: false }
            }
          }
          else if(rIdx === 9 && cIdx === 9){ //ugao4
            if((!prev[rIdx][cIdx-1].hasShip && !prev[rIdx-1][cIdx-1].hasShip && !prev[rIdx-1][cIdx].hasShip) && !c.hasShip){
              return {...c, shipNextTo: false }
            }
          }
          else if(rIdx === 0 && (cIdx >= 1 && cIdx <= 8)){ //prvi red
            if((!prev[rIdx][cIdx-1].hasShip && 
                !prev[rIdx+1][cIdx-1].hasShip && 
                !prev[rIdx][cIdx+1].hasShip && 
                !prev[rIdx+1][cIdx].hasShip && 
                !prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip
            ){
              return {...c, shipNextTo: false }
            }
          }
          else if(rIdx === 9 && (cIdx >= 1 && cIdx <= 8)){ //poslednji red
            if((!prev[rIdx][cIdx-1].hasShip && 
                !prev[rIdx-1][cIdx-1].hasShip && 
                !prev[rIdx][cIdx+1].hasShip && 
                !prev[rIdx-1][cIdx].hasShip && 
                !prev[rIdx-1][cIdx+1].hasShip) && !c.hasShip
            ){
              return {...c, shipNextTo: false }
            }
          }
          else if(cIdx === 0 && (rIdx >= 1 && rIdx <= 8)){ //prva kolona
            if((!prev[rIdx-1][cIdx].hasShip && 
                !prev[rIdx-1][cIdx+1].hasShip && 
                !prev[rIdx][cIdx+1].hasShip && 
                !prev[rIdx+1][cIdx].hasShip && 
                !prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip
            ){
              return {...c, shipNextTo: false }
            }
          }
          else if(cIdx === 9 && (rIdx >= 1 && rIdx <= 8)){ //poslednja kolona
            if((!prev[rIdx-1][cIdx].hasShip && 
                !prev[rIdx-1][cIdx-1].hasShip && 
                !prev[rIdx][cIdx-1].hasShip && 
                !prev[rIdx+1][cIdx-1].hasShip && 
                !prev[rIdx+1][cIdx].hasShip) && !c.hasShip
            ){
              return {...c, shipNextTo: false }
            }
          }
          else if(rIdx >=1 && cIdx >=1 && rIdx <=8 && cIdx <= 8){
            if((!prev[rIdx-1][cIdx-1].hasShip && 
                !prev[rIdx-1][cIdx].hasShip && 
                !prev[rIdx-1][cIdx+1].hasShip && 
                !prev[rIdx][cIdx-1].hasShip && 
                !prev[rIdx][cIdx+1].hasShip && 
                !prev[rIdx+1][cIdx-1].hasShip && 
                !prev[rIdx+1][cIdx].hasShip && 
                !prev[rIdx+1][cIdx+1].hasShip) && !c.hasShip) //!c.hasShip da ne bi polje sa brodom imalo shipNextTo: true
                {
                return {...c, shipNextTo: false }
                }
          }

          return c;
        })
      )
    }
  );
};
