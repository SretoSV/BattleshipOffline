import { render, screen, fireEvent } from "@testing-library/react";
import { WinnerModal } from "../components/WinnerModal";
import { vi } from "vitest";
import type { Cell } from "../types/CellTypes";
import { setHittedCell } from "../functions/setHittedCell";

vi.mock("../functions/setHittedCell", () => ({
  setHittedCell: vi.fn(),
}));

const createEmptyBoard = (rows = 10, cols = 10): Cell[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
        hasShip: false,
        isHit: false,
        shipNextTo: false
    }))
);

describe("WinnerModal", () => {
    const mockSetPlayer1HitCounter = vi.fn();
    const mockSetPlayer2HitCounter = vi.fn();
    const mockSetBoard3 = vi.fn();
    const mockSetBoard4 = vi.fn();
    const board1 = createEmptyBoard();
    const board2 = createEmptyBoard();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows winner", () => {
        render(
        <WinnerModal
            winner="Player 1 WON!"
            setPlayer1HitCounter={mockSetPlayer1HitCounter}
            setPlayer2HitCounter={mockSetPlayer2HitCounter}
            setBoard3={mockSetBoard3}
            setBoard4={mockSetBoard4}
            board1={board1}
            board2={board2}
        />
        );

        expect(screen.getByText("Player 1 WON!")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    });

    it("clicking Close resets everything and calls setHittedCell", () => {
        render(
        <WinnerModal
            winner="Player 2 WON!"
            setPlayer1HitCounter={mockSetPlayer1HitCounter}
            setPlayer2HitCounter={mockSetPlayer2HitCounter}
            setBoard3={mockSetBoard3}
            setBoard4={mockSetBoard4}
            board1={board1}
            board2={board2}
        />
        );

        fireEvent.click(screen.getByRole("button", { name: /close/i }));

        expect(mockSetPlayer1HitCounter).toHaveBeenCalledWith(0);
        expect(mockSetPlayer2HitCounter).toHaveBeenCalledWith(0);

        expect(setHittedCell).toHaveBeenCalledWith(mockSetBoard3, board1);
        expect(setHittedCell).toHaveBeenCalledWith(mockSetBoard4, board2);
    });
});
