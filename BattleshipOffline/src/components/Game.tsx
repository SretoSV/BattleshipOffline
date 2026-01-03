import type { Dispatch, SetStateAction } from 'react';
import styles from '../styles/BattleshipStyle.module.css';
import HitBoard from './HitBoard';
import type { Cell } from '../types/CellTypes';

interface GameProps{
    counter: number,
    setCounter: Dispatch<SetStateAction<number>>,
    board1: Cell[][];
    board2: Cell[][];
    board3: Cell[][];
    board4: Cell[][];
    setBoard3: Dispatch<SetStateAction<Cell[][]>>;
    setBoard4: Dispatch<SetStateAction<Cell[][]>>;
    onSetNumberOfHittedShips: (boardName: string) => void;
}

export function Game({counter, setCounter, board1, board2, board3, board4, setBoard3, setBoard4, onSetNumberOfHittedShips}: GameProps){
  return (
    <div className={styles.board3And4Div}>
        <div style={{ pointerEvents: counter % 2 === 0 ? 'none' : 'auto' }}>
            <HitBoard 
                board={board3} 
                boardCheck={board1} 
                setBoard={setBoard3} 
                boardName={"board3"} 
                onSetNumberOfHittedShips={onSetNumberOfHittedShips}
                onCount={(number: number) => setCounter(current => current + number)}
            />
        </div>

        <img
            alt="arrow"
            className={[
                styles.arrowImage,
                counter % 2 !== 0 && styles.player2,
            ]
                .filter(Boolean)
                .join(" ")}
        /> 
        
        <div style={{ pointerEvents: counter % 2 !== 0 ? 'none' : 'auto' }}>
            <HitBoard 
                board={board4} 
                boardCheck={board2} 
                setBoard={setBoard4} 
                boardName={"board4"} 
                onSetNumberOfHittedShips={onSetNumberOfHittedShips}
                onCount={(number: number) => setCounter(current => current + number)}

            />
        </div>
    </div>
  );
}
