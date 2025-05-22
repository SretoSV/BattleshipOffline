import { type Dispatch, type SetStateAction } from 'react';
import styles from '../styles/BattleshipStyle.module.css';
import type { Cell } from '../types/CellTypes';
import { setHittedCell } from '../functions/setHittedCell';

interface WinnerModalProps{
    winner: string,
    setPlayer1HitCounter: Dispatch<SetStateAction<number>>;
    setPlayer2HitCounter: Dispatch<SetStateAction<number>>;
    setBoard3: Dispatch<SetStateAction<Cell[][]>>;
    setBoard4: Dispatch<SetStateAction<Cell[][]>>;
    board1: Cell[][];
    board2: Cell[][];
}

export function WinnerModal({winner, setPlayer1HitCounter, setPlayer2HitCounter, setBoard3, setBoard4, board1, board2}: WinnerModalProps){
    const closeModal = () => {
        setPlayer1HitCounter(0);
        setPlayer2HitCounter(0);
        setHittedCell(setBoard3, board1);
        setHittedCell(setBoard4, board2);
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${winner === "Player 2 WON!" ? styles.modalBack2 : styles.modalBack1}`}>
            <h2>{winner}</h2>
            <button className={winner === "Player 2 WON!" ? styles.readyButton2 : styles.readyButton1} onClick={closeModal}>Close</button>
            </div>
        </div>
    )
}
