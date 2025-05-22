import { useState } from 'react';

export function useUsers(){
    
    const [user1Ready, setUser1Ready] = useState<boolean>(false);
    const [user2Ready, setUser2Ready] = useState<boolean>(false);
    const [player1HitCounter, setPlayer1HitCounter] = useState<number>(0);
    const [player2HitCounter, setPlayer2HitCounter] = useState<number>(0);
    const [user1ReadyButtonVisibility, setUser1ReadyButtonVisibility] = useState<boolean>(false);
    const [user2ReadyButtonVisibility, setUser2ReadyButtonVisibility] = useState<boolean>(false);
        
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

    return{
        user1Ready,
        user2Ready,
        player1HitCounter,
        player2HitCounter,
        user1ReadyButtonVisibility,
        user2ReadyButtonVisibility,
        setUser1Ready,
        setUser2Ready,
        setPlayer1HitCounter,
        setPlayer2HitCounter,
        setUser1ReadyButtonVisibility,
        setUser2ReadyButtonVisibility,
        handleSendShipLength1,
        handleSendShipLength2,
        handleCheckNumberOfHittedShips,
    }
}