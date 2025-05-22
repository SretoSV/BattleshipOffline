import { useState } from 'react';

export function usePlayer(){
    
    const [playerReady, setPlayerReady] = useState<boolean>(false);
    const [playerHitCounter, setPlayerHitCounter] = useState<number>(0);
    const [playerReadyButtonVisibility, setPlayerReadyButtonVisibility] = useState<boolean>(false);
 
    const handleSendShipLength = (length: number) => {
        if(length === 1){
            setPlayerReadyButtonVisibility(true);
        }
        else{
            setPlayerReadyButtonVisibility(false);
        }
    }


    return{
        playerReady,
        playerHitCounter,
        playerReadyButtonVisibility,
        setPlayerReady,
        setPlayerHitCounter,
        setPlayerReadyButtonVisibility,
        handleSendShipLength,
    }
}