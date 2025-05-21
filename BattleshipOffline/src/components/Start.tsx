import styles from '../styles/StartStyle.module.css';
import ship1 from '../images/ship1.png';
import vs from '../images/vs.png';
import ship2 from '../images/ship2.png';
interface startProps{
    onPlay: () => void;
};

export default function Start(props: startProps){


    return (
        <div className={styles.mainDiv}>
            <div className={styles.shipsDiv}>
                <img
                    src={ship1}
                    alt="Send"
                    className={styles.shipsImages}
                /> 
                <img
                    src={vs}
                    alt="Send"
                    className={styles.vsImage}
                /> 
                <img
                    src={ship2}
                    alt="Send"
                    className={styles.countImage}
                /> 
            </div>
            <button onClick={() => props.onPlay()} className={styles.playButton}>Play</button>
        </div>
    );
};
