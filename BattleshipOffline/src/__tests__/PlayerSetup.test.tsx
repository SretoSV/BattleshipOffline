import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { PlayerSetup } from "../components/PlayerSetup";
import type { Cell } from "../types/CellTypes";

//Mockujemo Board
vi.mock("../components/Board", () => ({
    __esModule: true,
    default: ({ boardName }: any) => (
        <div data-testid={`mock-board-${boardName}`}>{boardName}</div>
    ),
}));

const createEmptyBoard = (rows = 10, cols = 10): Cell[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      hasShip: false,
      isHit: false,
      shipNextTo: false
    }))
);

describe("PlayerSetup component", () => {
    const board = createEmptyBoard();
    const mockSetBoard = vi.fn();
    const mockSetPlayerReady = vi.fn();
    const mockOnSendShipLength = vi.fn();

    it("show rules", () => {
        render(
        <PlayerSetup
            board={board}
            boardName="board1"
            setBoard={mockSetBoard}
            setPlayerReady={mockSetPlayerReady}
            playerReadyButtonVisibility={false}
            onSendShipLength={mockOnSendShipLength}
        />
        );

        expect(screen.getByText(/Rotation - Click a boat/i)).toBeInTheDocument();
        expect(screen.getByText(/Removing - After placing/i)).toBeInTheDocument();
    });

    it("renders Board component", () => {
        render(
        <PlayerSetup
            board={board}
            boardName="board1"
            setBoard={mockSetBoard}
            setPlayerReady={mockSetPlayerReady}
            playerReadyButtonVisibility={false}
            onSendShipLength={mockOnSendShipLength}
        />
        );

        expect(screen.getByTestId("mock-board-board1")).toBeInTheDocument();
    });

    it("does not show the button if visibility is false", () => {
        render(
        <PlayerSetup
            board={board}
            boardName="board1"
            setBoard={mockSetBoard}
            setPlayerReady={mockSetPlayerReady}
            playerReadyButtonVisibility={false}
            onSendShipLength={mockOnSendShipLength}
        />
        );

        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    });

    it("shows a button and reacts to a click (without setStarted)", () => {
        render(
        <PlayerSetup
            board={board}
            boardName="board1"
            setBoard={mockSetBoard}
            setPlayerReady={mockSetPlayerReady}
            playerReadyButtonVisibility={true}
            onSendShipLength={mockOnSendShipLength}
        />
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockSetPlayerReady).toHaveBeenCalledWith(true);
    });

    it("calls setStarted if passed", () => {
        const mockSetStarted = vi.fn();

        render(
        <PlayerSetup
            board={board}
            boardName="board2"
            setBoard={mockSetBoard}
            setPlayerReady={mockSetPlayerReady}
            playerReadyButtonVisibility={true}
            onSendShipLength={mockOnSendShipLength}
            setStarted={mockSetStarted}
        />
        );

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockSetPlayerReady).toHaveBeenCalledWith(true);
        expect(mockSetStarted).toHaveBeenCalledWith(true);
    });
    
});