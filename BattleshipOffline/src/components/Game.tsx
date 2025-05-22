import type { Dispatch, SetStateAction } from 'react';
import styles from '../styles/BattleshipStyle.module.css';
import HitBoard from './HitBoard';
import play1 from '../images/play1.png';
import play2 from '../images/play2.png';
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
    onCheckNumberOfHittedShips: (boardName: string) => void;
}

export function Game({counter, setCounter, board1, board2, board3, board4, setBoard3, setBoard4, onCheckNumberOfHittedShips}: GameProps){
  return (
    <div className={styles.board3And4Div}>
        <div style={{ pointerEvents: counter % 2 === 0 ? 'none' : 'auto' }}>
            <HitBoard 
                board={board3} 
                boardCheck={board1} 
                setBoard={setBoard3} 
                boardName={"board3"} 
                onCheckNumberOfHittedShips={onCheckNumberOfHittedShips}
                onCount={(number: number) => setCounter(current => current + number)}
            />
        </div>

        <img
            src={counter % 2 === 0 ? play1 : play2}
            alt="Send"
            className={styles.countImage}
        /> 
        
        <div style={{ pointerEvents: counter % 2 !== 0 ? 'none' : 'auto' }}>
            <HitBoard 
                board={board4} 
                boardCheck={board2} 
                setBoard={setBoard4} 
                boardName={"board4"} 
                onCheckNumberOfHittedShips={onCheckNumberOfHittedShips}
                onCount={(number: number) => setCounter(current => current + number)}

            />
        </div>
    </div>
  );
}
