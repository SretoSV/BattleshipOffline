import styles from '../styles/BattleshipStyle.module.css';
import { useEffect, useState } from "react";
import type { Cell } from '../types/CellTypes';
import type { Ship } from '../types/ShipTypes';
import { initialShips } from '../constants/ships';
import { hitAroundTheShip } from '../functions/hitAroundTheShip';

interface HitBoardProps {
  board: Cell[][];
  boardCheck: Cell[][];
  setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
  boardName: string;
  onCheckNumberOfHittedShips: (boardName: string) => void;
  onCount: (number: number) => void;
}

export default function HitBoard(props:HitBoardProps){
    const [ships, setShips] = useState<Ship[]>(initialShips);
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
      hitAroundTheShip(props.setBoard, shipIdDropped);
      setShips(prevShips =>
          prevShips.map(ship => {
              if(ship.size === ship.hitCounter){
                  return { ...ship, hitCounter: 0 }
              }
              return ship;
          }
          )
      );

    };

    return (
        <div className={styles.boardDiv}>
            <div className={`${props.boardName === "board3" ? styles.player1 : styles.player2} `}>
              <b>
                {props.boardName === "board3" ? "Player 1" : "Player 2"}
              </b>
            </div>

            <div className={styles.board}>
            {props.board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                !cell.isHit ? 
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${styles.cell} ${styles.draggableCellStyle} ${cell.hasShip ? props.boardName === "board3" ? styles.ship1 : styles.ship2 : ""} ${cell.isHit ? styles.hit : ""}`}
                    onClick={() => handleClick?.(rowIndex, colIndex)}
                />
                :
                <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`${styles.cellHitted} ${styles.draggableCellStyle} ${cell.hasShip ? props.boardName === "board3" ? styles.ship1 : styles.ship2 : ""} ${cell.isHit ? styles.hit : ""}`}
                />
                ))
            )}
            </div>
        
        </div>
    
    );
};
