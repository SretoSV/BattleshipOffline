import { useState } from "react";
import Board from "../components/Board";
import styles from '../styles/BattleshipStyle.module.css';
import play1 from '../images/play1.png';
import play2 from '../images/play2.png';
import type { Cell } from "../types/CellTypes";
import HitBoard from "../components/HitBoard";
import Start from "../components/Start";

const createEmptyBoard = (): Cell[][] =>
  Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      hasShip: false,
      isHit: false,
      shipNextTo: false,
      shipId: 0,
    }))
);

export function Battleship(){
    const [board1, setBoard1] = useState<Cell[][]>(createEmptyBoard());
    const [board2, setBoard2] = useState<Cell[][]>(createEmptyBoard());
    const [board3, setBoard3] = useState<Cell[][]>(createEmptyBoard());
    const [board4, setBoard4] = useState<Cell[][]>(createEmptyBoard());
    const [started, setStarted] = useState<boolean>(false);
    const [play, setPlay] = useState<boolean>(false);
    const [user1Ready, setUser1Ready] = useState<boolean>(false);
    const [user2Ready, setUser2Ready] = useState<boolean>(false);
    const [player1HitCounter, setPlayer1HitCounter] = useState<number>(0);
    const [player2HitCounter, setPlayer2HitCounter] = useState<number>(0);
    const [user1ReadyButtonVisibility, setUser1ReadyButtonVisibility] = useState<boolean>(false);
    const [user2ReadyButtonVisibility, setUser2ReadyButtonVisibility] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    
    const handleSendShipLength1 = (length: number) => {
        if(length === 1){
            setUser1ReadyButtonVisibility(true);
        }
        else{
            setUser1ReadyButtonVisibility(false);
        }
    }

    const handleSendShipLength2 = (length: number) => {
        if(length === 1){
            setUser2ReadyButtonVisibility(true);
        }
        else{
            setUser2ReadyButtonVisibility(false);
        }
    }

    const handleCheckNumberOfHittedShips = (boardName: string) => {
        if(boardName === "board3"){
            setPlayer2HitCounter(current => current + 1);
        }
        else if(boardName === "board4"){
            setPlayer1HitCounter(current => current + 1);
        }
    }

    const closeModal = () => {
        setPlayer2HitCounter(0);
        setPlayer1HitCounter(0);
    }

    const handleCount = (number: number) => {
        setCounter(current => current + number);
    }
    
    const handlePlay = () => {
        setPlay(true);
    }

    return (
        <div className={styles.app}>
            <div className={styles.h1}><b>Battleship</b></div>
            {
            !play ? 
            <Start onPlay={handlePlay}/>
            :
            <div>
                
                {started === false ?
                <div>
                    {
                        user1Ready === false &&
                        <>
                            <div className={styles.divs}>
                                <Board board={board1} boardName={"board1"} setBoard={setBoard1} onSendShipLength= {handleSendShipLength1}/>
                                
                            </div>
                            <div>
                                Klikni na brod da ga rotiras.<br />
                                Kada ga postavis na tablu klikni na njega ako hoces da ga uklonis.
                                {user1ReadyButtonVisibility && 
                                    <button onClick={() => setUser1Ready(true)}>{"Ready => Player2"}</button>
                                }
                            </div>
                        </>

                    }
                    
                    {
                        user1Ready === true &&
                        <>
                            <div className={styles.divs}>
                                <Board board={board2} boardName={"board2"} setBoard={setBoard2} onSendShipLength= {handleSendShipLength2}/>
                            </div>
                            <div>
                                Klikni na brod da ga rotiras.<br />
                                Kada ga postavis na tablu klikni na njega ako hoces da ga uklonis.
                                {user2ReadyButtonVisibility && 
                                    <button onClick={() => {setUser2Ready(true); setStarted(true);}}>{"Start"}</button>
                                }
                            </div>
                        </>
                    }
                </div>
                :
                <div className={styles.divs}>
                    {user2Ready === true &&
                        <div className={styles.board3And4Div}>
                            <div style={{ pointerEvents: counter % 2 === 0 ? 'none' : 'auto' }}>
                                <HitBoard 
                                    board={board3} 
                                    boardCheck={board1} 
                                    setBoard={setBoard3} 
                                    boardName={"board3"} 
                                    onCheckNumberOfHittedShips={handleCheckNumberOfHittedShips}
                                    onCount={handleCount}
                                />
                            </div>
                            {counter % 2 === 0 ? 
                                <img
                                    src={play1}
                                    alt="Send"
                                    className={styles.countImage}
                                /> 
                                : 
                                <img
                                    src={play2}
                                    alt="Send"
                                    className={styles.countImage}
                                />
                            }
                            <div style={{ pointerEvents: counter % 2 !== 0 ? 'none' : 'auto' }}>
                                <HitBoard 
                                    board={board4} 
                                    boardCheck={board2} 
                                    setBoard={setBoard4} 
                                    boardName={"board4"} 
                                    onCheckNumberOfHittedShips={handleCheckNumberOfHittedShips}
                                    onCount={handleCount}
                                />
                            </div>
                        </div>
                    }
                    {
                        player2HitCounter === 20 && 
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                            <h2>Player 2 WON!</h2>
                            <button onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    }
                    {
                        player1HitCounter === 20 && 
                        <div className={styles.modalOverlay}>
                            <div className={styles.modal}>
                            <h2>Player 1 WON!</h2>
                            <button onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    }
                </div>
                }
            </div>
            }
        </div>
    );
}

/*
 <button onClick={() => handleShip()} className={styles.startButton}>Kreiraj partiju</button>
<GameMap player1={"1"} player2={"2"}/>
<ShipPlacement />
*/