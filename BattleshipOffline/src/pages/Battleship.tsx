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
        console.log("R1: " + length);
        if(length === 1){
            setUser1ReadyButtonVisibility(true);
        }
        else{
            setUser1ReadyButtonVisibility(false);
        }
    }

    const handleSendShipLength2 = (length: number) => {
        console.log("R2: " + length);
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
        setBoard3(prev => {
            return prev.map((r, rIdx) =>
                r.map((c, cIdx) => {
                    if(board1[rIdx][cIdx].hasShip)
                        return { ...c, isHit: true, hasShip: true };
                    else{
                        return { ...c, isHit: true };
                    }
                })
            )
            }
        );
        setBoard4(prev => {
            return prev.map((r, rIdx) =>
                r.map((c, cIdx) => {
                    if(board2[rIdx][cIdx].hasShip)
                        return { ...c, isHit: true, hasShip: true };
                    else{
                        return { ...c, isHit: true };
                    }
                })
            )
            }
        );
    }

    const handleCount = (number: number) => {
        setCounter(current => current + number);
    }
    
    const handlePlay = () => {
        setPlay(true);
    }

    const handleResetGame = () => {
        console.log("DDD");
        setPlay(false);
        setStarted(false);
        setUser1Ready(false);
        setUser2Ready(false);
        setPlayer1HitCounter(0);
        setPlayer2HitCounter(0);
        setUser1ReadyButtonVisibility(false);
        setUser2ReadyButtonVisibility(false);
        setCounter(0);
        setBoard1(prev => {
            return prev.map((r) =>
                r.map((c) => {
                    return { ...c, isHit: false, hasShip: false, shipNextTo: false, shipId: 0 };
                })
            )
            }
        );
        setBoard2(prev => {
            return prev.map((r) =>
                r.map((c) => {
                    return { ...c, isHit: false, hasShip: false, shipNextTo: false, shipId: 0 };
                })
            )
            }
        );
        setBoard3(prev => {
            return prev.map((r) =>
                r.map((c) => {
                    return { ...c, isHit: false, hasShip: false, shipNextTo: false, shipId: 0 };
                })
            )
            }
        );
        setBoard4(prev => {
            return prev.map((r) =>
                r.map((c) => {
                    return { ...c, isHit: false, hasShip: false, shipNextTo: false, shipId: 0 };
                })
            )
            }
        );
    }

    return (
        <div className={styles.app}>
            <div className={styles.h1}><b>Battleship</b></div>
            {
            !play ? 
            <Start onPlay={handlePlay}/>
            :
            <>
            
            <div>
                <button className={`${user1Ready && !user2Ready ? styles.readyButton2 : styles.readyButton1}`} onClick={() => handleResetGame()}>Reset</button>

                {started === false ?
                <div>
                    {
                        user1Ready === false &&
                        <>
                            <div className={styles.rulesDiv1}>
                                <b>Rotation - Click a boat before dragging it onto the board.</b><br />
                                <b>Removing - After placing a boat on the board, click it to remove it.</b><br />
                            </div>
                            <div className={styles.divs}>
                                <Board board={board1} boardName={"board1"} setBoard={setBoard1} onSendShipLength= {handleSendShipLength1}/>
                            </div>
 
                            {user1ReadyButtonVisibility && 
                                <button className={styles.readyButton1} onClick={() => setUser1Ready(true)}>{"Ready => Player2"}</button>
                            }
                        </>

                    }
                    
                    {
                        user1Ready === true &&
                        <>
                            <div className={styles.rulesDiv2}>
                                <b>Rotation - Click a boat before dragging it onto the board.</b><br />
                                <b>Removing - After placing a boat on the board, click it to remove it.</b><br />
                            </div>
                            <div className={styles.divs}>
                                <Board board={board2} boardName={"board2"} setBoard={setBoard2} onSendShipLength= {handleSendShipLength2}/>
                            </div>
                            {user2ReadyButtonVisibility && 
                                <button className={styles.readyButton2} onClick={() => {setUser2Ready(true); setStarted(true);}}>{"Start"}</button>
                            }
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
                            <div className={`${styles.modal} ${styles.modalBack2}`}>
                            <h2>Player 2 WON!</h2>
                            <button className={styles.readyButton2} onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    }
                    {
                        player1HitCounter === 20 && 
                        <div className={styles.modalOverlay}>
                            <div className={`${styles.modal} ${styles.modalBack1}`}>
                            <h2>Player 1 WON!</h2>
                            <button className={styles.readyButton1} onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    }
                </div>
                }
            </div>
            </>
            }
        </div>
    );
}

/*
 <button onClick={() => handleShip()} className={styles.startButton}>Kreiraj partiju</button>
<GameMap player1={"1"} player2={"2"}/>
<ShipPlacement />
*/