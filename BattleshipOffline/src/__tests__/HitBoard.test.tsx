import { render, fireEvent, screen } from "@testing-library/react";
import HitBoard from "../components/HitBoard";
import { vi } from "vitest";

const generateEmptyBoard = (): any[][] => {
  return Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
      hasShip: false,
      isHit: false,
      shipId: undefined,
    }))
  );
};

describe("HitBoard component", () => {
    let board: any[][];
    let boardCheck: any[][];
    let setBoard: any;
    let onSetNumberOfHittedShips: any;
    let onCount: any;

    beforeEach(() => {
        board = generateEmptyBoard();
        boardCheck = generateEmptyBoard();
        setBoard = vi.fn();
        onSetNumberOfHittedShips = vi.fn();
        onCount = vi.fn();
    });

    it("renders player 1 heading for board3", () => {
        //way 1
        render(
        <HitBoard
            board={board}
            boardCheck={boardCheck}
            setBoard={setBoard}
            boardName="board3"
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
            onCount={onCount}
        />
        );

        expect(screen.getByText("Player 1")).toBeInTheDocument();
    });

    it("renders player 2 heading for board4", () => {
        //way 2
        const { getByText } = render(
        <HitBoard
            board={board}
            boardCheck={boardCheck}
            setBoard={setBoard}
            boardName="board4"
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
            onCount={onCount}
        />
        );

        expect(getByText("Player 2")).toBeInTheDocument();
    });

    it("calls onCount(2) and onSetNumberOfHittedShips when a ship is hit", () => {
        boardCheck[2][3].hasShip = true;
        boardCheck[2][3].shipId = 1;

        const { getAllByTestId } = render(
        <HitBoard
            board={board}
            boardCheck={boardCheck}
            setBoard={setBoard}
            boardName="board3"
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
            onCount={onCount}
        />
        );

        const cells = getAllByTestId("clickable-cell");
        fireEvent.click(cells[2 * 10 + 3]); // click on cell [2][3]

        expect(onCount).toHaveBeenCalledWith(2);
        expect(onSetNumberOfHittedShips).toHaveBeenCalledWith("board3");
        expect(setBoard).toHaveBeenCalled();
    });

    it("calls onCount(1) when an empty cell is hit", () => {
        const { getAllByTestId } = render(
        <HitBoard
            board={board}
            boardCheck={boardCheck}
            setBoard={setBoard}
            boardName="board4"
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
            onCount={onCount}
        />
        );

        const cells = getAllByTestId("clickable-cell");
        fireEvent.click(cells[5 * 10 + 5]); // click on cell [5][5]

        expect(onCount).toHaveBeenCalledWith(1);
        expect(onSetNumberOfHittedShips).not.toHaveBeenCalled();
        expect(setBoard).toHaveBeenCalled();
    });

    it("does not allow clicking already hit cell again", () => {
        board[4][4].isHit = true;

        const { getAllByTestId } = render(
        <HitBoard
            board={board}
            boardCheck={boardCheck}
            setBoard={setBoard}
            boardName="board3"
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
            onCount={onCount}
        />
        );

        const hitCells = getAllByTestId("non-clickable-cell");
        expect(hitCells.length).toBeGreaterThan(0);
        expect(hitCells.length).toBe(1);
    });
});
