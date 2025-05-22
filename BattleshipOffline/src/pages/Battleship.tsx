import { useState } from "react";
import styles from '../styles/BattleshipStyle.module.css';
import Start from "../components/Start";
import { useBorads } from "../hooks/useBorads";
import { WinnerModal } from "../components/WinnerModal";
import { resetBoard } from "../functions/resetBoard";
import { Game } from "../components/Game";
import { PlayerSetup } from "../components/PlayerSetup";
import { usePlayer } from "../hooks/usePlayer";

export function Battleship(){
    const [play, setPlay] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);

    const {board1, board2, board3, board4, setBoard1, setBoard2, setBoard3, setBoard4} = useBorads();
    const player1 = usePlayer();
    const player2 = usePlayer();

    const handleResetGame = () => {
        setPlay(false);
        setStarted(false);
        player1.setPlayerReady(false);
        player2.setPlayerReady(false);
        player1.setPlayerHitCounter(0);
        player2.setPlayerHitCounter(0);
        player1.setPlayerReadyButtonVisibility(false);
        player2.setPlayerReadyButtonVisibility(false);
        setCounter(0);
        resetBoard(setBoard1);
        resetBoard(setBoard2);
        resetBoard(setBoard3);
        resetBoard(setBoard4);
    }

    const handleSetNumberOfHittedShips = (boardName: string) => {
        if(boardName === "board3"){
            player2.setPlayerHitCounter(current => current + 1);
        }
        else if(boardName === "board4"){
            player1.setPlayerHitCounter(current => current + 1);
        }
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
                <button className={`${player1.playerReady && !player2.playerReady ? styles.readyButton2 : styles.readyButton1}`} onClick={() => handleResetGame()}>Reset</button>

                {started === false ?
                <div>
                    {
                        player1.playerReady === false &&
                        <PlayerSetup
                            playerReadyButtonVisibility={player1.playerReadyButtonVisibility}
                            setPlayerReady={player1.setPlayerReady}
                            setBoard={setBoard1}
                            onSendShipLength={player1.handleSendShipLength}
                            board={board1}
                            boardName={"board1"}
                        />
                    }
                    
                    {
                        player1.playerReady === true &&
                        <PlayerSetup
                            playerReadyButtonVisibility={player2.playerReadyButtonVisibility}
                            setPlayerReady={player2.setPlayerReady}
                            setBoard={setBoard2}
                            onSendShipLength={player2.handleSendShipLength}
                            board={board2}
                            boardName={"board2"}
                            setStarted={setStarted}
                        />
                    }
                </div>
                :
                <div className={styles.divs}>

                    {player2.playerReady === true &&
                        <Game
                            counter={counter}
                            setCounter={setCounter}
                            board1={board1}
                            board2={board2}
                            board3={board3}
                            board4={board4}
                            setBoard3={setBoard3}
                            setBoard4={setBoard4}
                            onSetNumberOfHittedShips={handleSetNumberOfHittedShips}
                        />
                    }
                    {
                        player2.playerHitCounter === 20 && 
                        <WinnerModal 
                            winner={"Player 2 WON!"} 
                            setPlayer1HitCounter={player1.setPlayerHitCounter} 
                            setPlayer2HitCounter={player2.setPlayerHitCounter}
                            setBoard3={setBoard3} 
                            setBoard4={setBoard4} 
                            board1={board1} 
                            board2={board2}
                        />
                    }
                    {
                        player1.playerHitCounter === 20 && 
                        <WinnerModal 
                            winner={"Player 1 WON!"} 
                            setPlayer1HitCounter={player1.setPlayerHitCounter} 
                            setPlayer2HitCounter={player2.setPlayerHitCounter}
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
