import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";
import type { Cell } from "../types/CellTypes";
import { initialShips } from "../constants/ships";
import { vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function generateEmptyBoard(): Cell[][] {
    return Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({
        hasShip: false,
        shipNextTo: false,
        isHit: false,
        }))
    );
}

export function renderWithDnd(ui: React.ReactElement) {
    return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
}

describe("Board component", () => {
    let board: Cell[][];
    let setBoard: React.Dispatch<React.SetStateAction<Cell[][]>> = vi.fn();
    let mockSetBoard: ReturnType<typeof vi.fn>;
    let onSendShipLength: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        board = generateEmptyBoard();
        mockSetBoard = vi.fn();
        setBoard = (b) => mockSetBoard(b);
        onSendShipLength = vi.fn();
    });

    it("renders Player 1 heading", () => {
        renderWithDnd(
        <Board
            board={board}
            setBoard={setBoard}
            boardName="board1"
            onSendShipLength={onSendShipLength}
        />
        );
        expect(screen.getByText("Player 1")).toBeInTheDocument();
    });

    it("renders Player 2 heading", () => {
        renderWithDnd(
        <Board
            board={board}
            setBoard={setBoard}
            boardName="board2"
            onSendShipLength={onSendShipLength}
        />
        );
        expect(screen.getByText("Player2")).toBeInTheDocument();
    });

    it("renders correct number of cells", () => {
        renderWithDnd(
        <Board
            board={board}
            setBoard={setBoard}
            boardName="board1"
            onSendShipLength={onSendShipLength}
        />
        );

        const cells = screen.getAllByTestId("non-clickable-cell");
        expect(cells.length).toBe(100);
    });

    it("renders draggable ships", () => {
        renderWithDnd(
        <Board
            board={board}
            setBoard={setBoard}
            boardName="board1"
            onSendShipLength={onSendShipLength}
        />
        );

        expect(initialShips.length).toBe(10);
    });

    it("removes ship on click if cell has ship", () => {
        board[0][0] = { hasShip: true, shipId: 10, shipNextTo: false, isHit: false };

        renderWithDnd(
        <Board
            board={board}
            setBoard={setBoard}
            boardName="board1"
            onSendShipLength={onSendShipLength}
        />
        );

        const clickableCells = screen.getAllByTestId("clickable-cell");
        expect(clickableCells.length).toBe(1);
        fireEvent.click(clickableCells[0]);

        expect(mockSetBoard).toHaveBeenCalled();
    });
});
