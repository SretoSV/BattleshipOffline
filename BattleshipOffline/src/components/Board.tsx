import styles from '../styles/BattleshipStyle.module.css';
import DroppableCell from "../components/DroppableCell";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import DraggableShip from "../components/DraggableShip";
import type { Cell } from '../types/CellTypes';
import type { Ship } from '../types/ShipTypes';
import { initialShips } from '../constants/ships';
import { removeRemainingShipPartsFromBoard, removeShipFromBoardOnClick } from '../functions/removeShip';
import { addNextToShip, removeNextToShip } from '../functions/nextToShipFunctions';

interface BoardProps {
  board: Cell[][];
  boardName: string;
  setBoard: Dispatch<SetStateAction<Cell[][]>>;
  onSendShipLength: (length: number) => void;
};

export default function Board(props:BoardProps){
    
    const [ships, setShips] = useState<Ship[]>(initialShips);
    const [currentShipSize, setCurrentShipSize] = useState<number>(0);
    const [currentShipId, setCurrentShipId] = useState<number>(0);
    const [numOfcurrentShip, setNumOfCurrentShip] = useState<number>(0);
    const [checkBoard, setCheckBoard] = useState<boolean>(false);
    const [nextToShip, setNextToShip] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);

    const placeShip = (row: number, col: number, ship: Ship & { clickedIndex?: number }) => {
      
      const index = ship.clickedIndex ?? 0;
      
      if((ship.orientation === "horizontal" && col - index >= 0 )  //ako brod ode izvan granica da se ne baci gresku nepostojeceg index-a
        || (ship.orientation === "vertical" && row - index >= 0 )){
          
        // koriguj poziciju da se uvek postavi brod od index 0
        ship.orientation === "horizontal" ? col = col - index : row = row - index; //oduzmi od kolone index da bi se gledalo od pocetnog index-a

        setCurrentShipId(ship.id);
        setCurrentShipSize(ship.size);
        
        const canPlace =
          ship.orientation === "horizontal"
            ? col + ship.size <= 10
            : row + ship.size <= 10;
    
        if (!canPlace) return;
    
        props.setBoard(prev => {
          if (prev[row][col].hasShip || prev[row][col].shipNextTo) {
            return prev; // Ne menjaj ništa
          }

          return prev.map((r, rIdx) =>
            r.map((c, cIdx) => {
              const inRange =
                ship.orientation === "horizontal" //popuni sva polja od - do
                  ? rIdx === row && cIdx >= col && cIdx < col + ship.size && !c.hasShip && !c.shipNextTo //!c.hasShip da neprelepi prvi brod
                  : cIdx === col && rIdx >= row && rIdx < row + ship.size && !c.hasShip && !c.shipNextTo;//!c.shipNextTo da ne bi dozvolio da se postavi brod kada se sa prvim delom broda ide na prazno polje a ostatak broda ide na polje koje ima c.shipNextTo
              if(inRange){
                setNumOfCurrentShip(current => current + 1);
                
              }
              return inRange
                ? { ...c, hasShip: true, shipId: ship.id }
                : c;
            })
          )
        }
        );
        setCheckBoard(current => !current);
      }
      
    };

    useEffect(() => {
      if(currentShipSize > numOfcurrentShip){
        removeRemainingShipPartsFromBoard(props.setBoard, currentShipId);
      }
      else{
        //ako nisam uklanjao ostatak broda, onda uklanjam ship iz niza i prelazim na dodavanje polja oko ship-a
        setShips(prevShips => prevShips.filter(shipIn => shipIn.id !== currentShipId));
        setNextToShip(current => !current);
        props.onSendShipLength(ships.length);
      }
      
      setNumOfCurrentShip(0);
    }, [checkBoard]);

    //Next To Ship
    useEffect(() => {
      addNextToShip(props.setBoard);
    }, [nextToShip]);

    //remove Next To Ship
    useEffect(() => {
      removeNextToShip(props.setBoard);
    }, [remove]);

  return (
    <>
    
    <div className={styles.boardDiv}>
      <div className={`${props.boardName === "board1" ? styles.player1 : styles.player2} `}>
        <b>
          {props.boardName === "board1" ? "Player 1" : "Player2"}
        </b>
      </div>

      <div className={styles.board}>
        {props.board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (

                <DroppableCell
                  key={`${rowIndex}-${colIndex}`}
                  row={rowIndex}
                  col={colIndex}
                  onDropShip={placeShip}
                  board={props.board}
                  boardName={props.boardName}
                >
                    { cell.hasShip ?
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`${styles.cell} ${cell.hasShip ? props.boardName === "board1" ? styles.ship1 : styles.ship2 : ""} `}
                      onClick={() => {
                        removeShipFromBoardOnClick(
                          props.onSendShipLength,
                          ships,
                          props.setBoard,
                          setShips,
                          cell.shipId
                        )
                        setRemove(current => !current);
                      }
                      }
                      title="Click To Remove"
                    /> 
                      :
                      cell.shipNextTo ? 
                      <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`${styles.cell} ${cell.shipNextTo ? styles.next : ""} `}
                    /> :
                    <div></div>
                    }
                </DroppableCell>
          ))
        )}
      </div>

    </div>

    <div className={styles.shipDiv}>
      <h2 className={`${props.boardName === "board1" ? styles.shipsHead1 : styles.shipsHead2} `}>Ships</h2>
      {ships.map((ship) => (
        <DraggableShip key={ship.id} ship={ship} setShips={setShips} boardName={props.boardName}/>
      ))}
    </div>

    </>
  );
};
