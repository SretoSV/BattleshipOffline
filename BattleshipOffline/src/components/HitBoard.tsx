import styles from '../styles/BattleshipStyle.module.css';
import { useEffect, useState } from "react";
import type { Cell } from '../types/CellTypes';
import type { Ship } from '../types/ShipTypes';

interface HitBoardProps {
  board: Cell[][];
  boardCheck: Cell[][];
  //handleClick?: (row: number, col: number) => void;
  setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
  boardName: string;
  onCheckNumberOfHittedShips: (boardName: string) => void;
  onCount: (number: number) => void;
}

const initialShips: Ship[] = [
  { id: 1, size: 4, orientation: "horizontal", hitCounter: 0 },
  { id: 2, size: 3, orientation: "horizontal", hitCounter: 0 },
  { id: 3, size: 3, orientation: "horizontal", hitCounter: 0 },
  { id: 4, size: 2, orientation: "horizontal", hitCounter: 0 },
  { id: 5, size: 2, orientation: "horizontal", hitCounter: 0 },
  { id: 6, size: 2, orientation: "horizontal", hitCounter: 0 },
  { id: 7, size: 1, orientation: "horizontal", hitCounter: 0 },
  { id: 8, size: 1, orientation: "horizontal", hitCounter: 0 },
  { id: 9, size: 1, orientation: "horizontal", hitCounter: 0 },
  { id: 10, size: 1, orientation: "horizontal", hitCounter: 0 },
  
];

export default function HitBoard(props:HitBoardProps){
    const [ships, setShips] = useState<Ship[]>(initialShips);
    const [hitAround, setHitAround] = useState<boolean>(false);
    const [checkShipCounter, setCheckShipCounter] = useState<boolean>(false);

    const handleClick = (row: number, col: number) => {
        
        if(props.boardCheck[row][col].hasShip){
            props.onCount(2);
            props.onCheckNumberOfHittedShips(props.boardName);
            
            setShips(prevShips =>
                prevShips.map(ship =>
                    ship.id === props.boardCheck[row][col].shipId
                    ? { ...ship, hitCounter: ship.hitCounter + 1 }
                    : ship
                )
            );

            props.setBoard(prev =>
                prev.map((r, rIdx) =>
                    r.map((c, cIdx) => {
                    
                    if (rIdx === row && cIdx === col) {
                        
                        return { ...c, isHit: true, hasShip: true, shipId: props.boardCheck[row][col].shipId };
                    }
                    return c;
                    })
                )
            );

        }
        else{
            props.onCount(1);
            props.setBoard(prev =>
            prev.map((r, rIdx) =>
                r.map((c, cIdx) => {
                if (rIdx === row && cIdx === col) {
                    return { ...c, isHit: true };
                }
                return c;
                })
            )
            );
        }
        setCheckShipCounter(current => !current);
    };


    useEffect(() => {
        console.log("Updated ships:", ships);
        let currentShipId = -1;
        ships.forEach(ship1 => {
            if(ship1.size === ship1.hitCounter){ //ako je neki brod skroz srusen predji na popunjavanje svih polja okolo
                currentShipId = ship1.id;
            }
        }
        );
        if(currentShipId != -1){
            handleHitAround(currentShipId);
        }
    }, [checkShipCounter]);

    const handleHitAround = (shipIdDropped: number) => {
      console.log("ID " + shipIdDropped);

      props.setBoard(prev => {
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

      setShips(prevShips =>
          prevShips.map(ship => {
              if(ship.size === ship.hitCounter){
                  return { ...ship, hitCounter: 0 }
              }
              return ship;
          }
          )
      );

      setHitAround(current => !current);

    };

    useEffect(() => {
        console.log("Updated ships HIT AROUND:", ships);
    }, [hitAround]);

    return (
        <div className={styles.boardDiv}>
            <div>{props.boardName}</div>
            <div className={styles.table}>
                {Array.from({ length: 10 }, (_, i) => {
                    return <div key={i} className={styles.number}>
                    {i}
                    </div>
                })}
            </div>
            <div className={styles.board}>
            {props.board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                !cell.isHit ? 
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${styles.cell} ${cell.hasShip ? styles.ship : ""} ${cell.isHit ? styles.hit : ""}`}
                    onClick={() => handleClick?.(rowIndex, colIndex)}
                />
                :
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${styles.cellHitted} ${cell.hasShip ? styles.ship : ""} ${cell.isHit ? styles.hit : ""}`}
                />
                ))
            )}
            </div>
        
        </div>
    
    );
};
