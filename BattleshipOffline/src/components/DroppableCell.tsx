import { useDrop } from "react-dnd";
import type { Ship } from "../types/ShipTypes";
import type { Cell } from "../types/CellTypes";

interface DroppableCellProps {
    row: number;
    col: number;
    onDropShip: (row: number, col: number, ship: Ship) => void;
    children?: React.ReactNode;
    board?: Cell[][]; // Dodaj board kao prop da možemo proveriti stanje
}

const DroppableCell: React.FC<DroppableCellProps> = ({
    row,
    col,
    onDropShip,
    children,
    board, // primamo board
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "SHIP",
    drop: (item: Ship & { clickedIndex: number }) => {
        // ➕ Provera da li polja na koje želimo da postavimo brod imaju `hasShip: true`
        const isHorizontal = item.orientation === "horizontal";

        const canPlaceWithinBounds = isHorizontal
            ? col - item.clickedIndex + item.size <= 10
            : row - item.clickedIndex + item.size <= 10;

        if (!canPlaceWithinBounds || !board) return;
        

        const cellsToCheck = isHorizontal
            ? Array.from({ length: item.size - item.clickedIndex }, (_, i) => board[row][col + i])
            : Array.from({ length: item.size - item.clickedIndex }, (_, i) => board[row + i][col]);

        const overlap = cellsToCheck.some(cell => cell.hasShip);
        if (overlap) return;

        onDropShip(row, col, item);
    },
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
        ref={(node: HTMLDivElement | null) => {
            if (node) drop(node);
        }}
        style={{
            width: 30,
            height: 30,
            border: "1px solid black",
            backgroundColor: isOver ? "#aaf" : "#cce",
        }}
    >
        {children}
    </div>
  );
};

export default DroppableCell;
