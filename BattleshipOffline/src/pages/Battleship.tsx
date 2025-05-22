import { useState } from "react";
import styles from '../styles/BattleshipStyle.module.css';
import Start from "../components/Start";
import { useBorads } from "../hooks/useBorads";
import { useUsers } from "../hooks/useUsers";
import { WinnerModal } from "../components/WinnerModal";
import { resetBoard } from "../functions/resetBoard";
import { Game } from "../components/Game";
import { PlayerSetup } from "../components/PlayerSetup";

export function Battleship(){
    const [play, setPlay] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);

    const {board1, board2, board3, board4, setBoard1, setBoard2, setBoard3, setBoard4} = useBorads();
    const {user1Ready, user2Ready, player1HitCounter, player2HitCounter, user1ReadyButtonVisibility, user2ReadyButtonVisibility,
           setUser1Ready, setUser2Ready, setPlayer1HitCounter, setPlayer2HitCounter, setUser1ReadyButtonVisibility, setUser2ReadyButtonVisibility,
           handleSendShipLength1, handleSendShipLength2, handleCheckNumberOfHittedShips} = useUsers();

    const handleResetGame = () => {
        setPlay(false);
        setStarted(false);
        setUser1Ready(false);
        setUser2Ready(false);
        setPlayer1HitCounter(0);
        setPlayer2HitCounter(0);
        setUser1ReadyButtonVisibility(false);
        setUser2ReadyButtonVisibility(false);
        setCounter(0);
        resetBoard(setBoard1);
        resetBoard(setBoard2);
        resetBoard(setBoard3);
        resetBoard(setBoard4);
    }

    return (
        <div className={styles.app}>
            <div className={styles.h1}><b>Battleship</b></div>
            {
            !play ? 
            <Start onPlay={() => setPlay(true)}/>
            :
            <>
            
            <div>
                <button className={`${user1Ready && !user2Ready ? styles.readyButton2 : styles.readyButton1}`} onClick={() => handleResetGame()}>Reset</button>

                {started === false ?
                <div>
                    {
                        user1Ready === false &&
                        <PlayerSetup
                            userReadyButtonVisibility={user1ReadyButtonVisibility}
                            setUserReady={setUser1Ready}
                            setBoard={setBoard1}
                            onSendShipLength={handleSendShipLength1}
                            board={board1}
                            boardName={"board1"}
                        />
                    }
                    
                    {
                        user1Ready === true &&
                        <PlayerSetup
                            userReadyButtonVisibility={user2ReadyButtonVisibility}
                            setUserReady={setUser2Ready}
                            setBoard={setBoard2}
                            onSendShipLength={handleSendShipLength2}
                            board={board2}
                            boardName={"board2"}
                            setStarted={setStarted}
                        />
                    }
                </div>
                :
                <div className={styles.divs}>

                    {user2Ready === true &&
                        <Game
                            counter={counter}
                            setCounter={setCounter}
                            board1={board1}
                            board2={board2}
                            board3={board3}
                            board4={board4}
                            setBoard3={setBoard3}
                            setBoard4={setBoard4}
                            onCheckNumberOfHittedShips={handleCheckNumberOfHittedShips}
                        />
                    }
                    {
                        player2HitCounter === 20 && 
                        <WinnerModal 
                            winner={"Player 2 WON!"} 
                            setPlayer1HitCounter={setPlayer1HitCounter} 
                            setPlayer2HitCounter={setPlayer2HitCounter}
                            setBoard3={setBoard3} 
                            setBoard4={setBoard4} 
                            board1={board1} 
                            board2={board2}
                        />
                    }
                    {
                        player1HitCounter === 20 && 
                        <WinnerModal 
                            winner={"Player 1 WON!"} 
                            setPlayer1HitCounter={setPlayer1HitCounter} 
                            setPlayer2HitCounter={setPlayer2HitCounter}
                            setBoard3={setBoard3} 
                            setBoard4={setBoard4} 
                            board1={board1} 
                            board2={board2}
                        />
                    }
                </div>
                }
            </div>
            </>
            }
        </div>
    );
}
