import styles from '../styles/BattleshipStyle.module.css';
import DroppableCell from "../components/DroppableCell";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import DraggableShip from "../components/DraggableShip";
import type { Cell } from '../types/CellTypes';
import type { Ship } from '../types/ShipTypes';

interface BoardProps {
  board: Cell[][];
  boardName: string;
  setBoard: Dispatch<SetStateAction<Cell[][]>>;
  onSendShipLength: (length: number) => void;
};

const initialShips: Ship[] = [
  { id: 1, size: 4, orientation: "horizontal", hitCounter: 0 },
  { id: 2, size: 3, orientation: "horizontal", hitCounter: 0 },
  { id: 3, size: 3, orientation: "horizontal", hitCounter: 0 },
  { id: 4, size: 2, orientation: "horizontal", hitCounter: 0 },
  { id: 5, size: 2, orientation: "horizontal", hitCounter: 0 },
  { id: 6, size: 2, orientation: "horizontal", hitCounter: 0 },
  { id: 7, size: 1, orientation: "horizontal", hitCounter: 0},
  { id: 8, size: 1, orientation: "horizontal", hitCounter: 0 },
  { id: 9, size: 1, orientation: "horizontal", hitCounter: 0 },
  { id: 10, size: 1, orientation: "horizontal", hitCounter: 0 },
  
];

export default function Board(props:BoardProps){
    
    const [ships, setShips] = useState<Ship[]>(initialShips);
    const [currentShipSize, setCurrentShipSize] = useState<number>(0);
    const [currentShipId, setCurrentShipId] = useState<number>(0);
    const [numOfcurrentShip, setNumOfCurrentShip] = useState<number>(0);
    const [checkBoard, setCheckBoard] = useState<boolean>(false);
    const [nextToShip, setNextToShip] = useState<boolean>(false);
    const [nextToShip2, setNextToShip2] = useState<boolean>(false);
    const [remove, setRemove] = useState<boolean>(false);

    const placeShip = (row: number, col: number, ship: Ship & { clickedIndex?: number }) => {
      
      const index = ship.clickedIndex ?? 0;
      console.log(index);
      if((ship.orientation === "horizontal" && col - index >= 0 )  //ako brod ode izvan granica da se ne baci gresku nepostojeceg index-a
        || (ship.orientation === "vertical" && row - index >= 0 )){
        // koriguj poziciju da se uvek postavi brod od index 0
        if (ship.orientation === "horizontal") {
          col = col - index; //oduzmi od kolone index da bi se gledalo od pocetnog index-a
        } else {
          row = row - index;
        }

        setCurrentShipId(ship.id);
        setCurrentShipSize(ship.size);
        //console.log(row + " : " + col);
        const canPlace =
          ship.orientation === "horizontal"
            ? col + ship.size <= 10
            : row + ship.size <= 10;
    
        if (!canPlace) return;
    
        props.setBoard(prev => {
          if (prev[row][col].hasShip || prev[row][col].shipNextTo) {
            console.log("Već postoji brod ovde!"); 
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
      console.log(`props.board ${props.boardName} changed!`, props.board);
      console.log("SHIP Id: " + currentShipId);
      console.log("SHIP SIZE: " + currentShipSize);
      console.log("NUM: " + numOfcurrentShip);
      
      if(currentShipSize > numOfcurrentShip){
        props.setBoard(prev => {
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
      props.setBoard(prev => {
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
      setNextToShip2(current => !current);
    }, [nextToShip]);

    useEffect(() => {
      console.log(`!!!props.board ${props.boardName} changed!`, props.board);
    }, [nextToShip2]);

    const handleRemove = (shipId: number | undefined) => {
      console.log(shipId);
      props.setBoard(prev => {
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
      handleAddShipAgainToString(shipId);
      setRemove(current => !current);
      if(ships.length === 0 || ships.length === 1){
        props.onSendShipLength(2); 
      }
      else{
        props.onSendShipLength(ships.length);
      }
    };

    //remove Next To Ship
    useEffect(() => {
      props.setBoard(prev => {
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
      setNextToShip2(current => !current);
    }, [remove]);

    const handleAddShipAgainToString = (shipId: number | undefined) => {
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
                      onClick={() => handleRemove(cell.shipId)}
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
