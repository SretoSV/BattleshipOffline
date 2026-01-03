import { useDrag } from "react-dnd";
import type { Ship } from "../types/ShipTypes";
import { useState, type Dispatch, type SetStateAction } from "react";
import styles from '../styles/BattleshipStyle.module.css';

interface DraggableShipProps {
  ship: Ship;
  setShips: Dispatch<SetStateAction<Ship[]>>;
  boardName: string;
}

export default function DraggableShip({ ship, setShips, boardName }: DraggableShipProps) {
  const [clickedIndex, setClickedIndex] = useState(0);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "SHIP",
    item: () => ({ ...ship, clickedIndex }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const rotateShip = (id: number) => {
    setShips((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              orientation: s.orientation === "horizontal" ? "vertical" : "horizontal",
            }
          : s
      )
    );
  };

  return (
    <div
        data-testid="ship-container"
        ref={(node: HTMLDivElement | null) => {
            if (node) {
                preview(node);
            }
        }}
        onClick={() => rotateShip(ship.id)}
        style={{
            opacity: isDragging ? 0.5 : 1,
            display: "flex",
            flexDirection: ship.orientation === "horizontal" ? "row" : "column",
            cursor: "grab",
            marginBottom: "10px",
        }}
    >
        {Array.from({ length: ship.size }).map((_, idx) => (
            <div
              key={idx}
              data-testid="ship-part"
              data-active={idx === clickedIndex}
              ref={(node) => {
                  if (idx === clickedIndex && node) {
                    drag(node);
                  }
              }}
              onMouseDown={() => setClickedIndex(idx)}
              className={[
                styles.shipPart,
                boardName === "board1" && styles.shipBoard1,
                boardName !== "board1" && styles.shipBoard2,
              ]
                .filter(Boolean)
                .join(" ")}
            />
        ))}
    </div>
  );
}