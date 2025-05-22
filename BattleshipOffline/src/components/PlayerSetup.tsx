import type { Dispatch, SetStateAction } from 'react';
import styles from '../styles/BattleshipStyle.module.css';
import Board from './Board';
import type { Cell } from '../types/CellTypes';


interface PlayerSetupProps{
    userReadyButtonVisibility: boolean,
    setUserReady: Dispatch<SetStateAction<boolean>>;
    setBoard: Dispatch<SetStateAction<Cell[][]>>;
    onSendShipLength: (length: number) => void;
    board: Cell[][];
    boardName: string,
    setStarted?: Dispatch<SetStateAction<boolean>>;
}

export function PlayerSetup({userReadyButtonVisibility, setUserReady, setBoard, onSendShipLength, board, boardName, setStarted}: PlayerSetupProps){
  return (
    <>
        <div className={boardName === "board1" ? styles.rulesDiv1 : styles.rulesDiv2}>
            <b>Rotation - Click a boat before dragging it onto the board.</b><br />
            <b>Removing - After placing a boat on the board, click it to remove it.</b><br />
        </div>
        <div className={styles.divs}>
            <Board board={board} boardName={boardName} setBoard={setBoard} onSendShipLength={onSendShipLength}/>
        </div>

        {userReadyButtonVisibility && 
            <button className={boardName === "board1" ? styles.readyButton1 : styles.readyButton2} onClick={() => {setUserReady(true); setStarted && setStarted(true);}}>{boardName === "board1" ? "Ready => Player2" : "Start"}</button>
        }
    </>
  )
}