import { render, screen, fireEvent } from "@testing-library/react";
import { Game } from "../components/Game";
import { vi } from "vitest";
import type { Cell } from "../types/CellTypes";

//Mockujemo sliku - mora da se vrati kao default jer Webpack/Vite slike ucitavaju kao "default export"
vi.mock("../images/play1.png", () => ({ default: "play1.png" }));
vi.mock("../images/play2.png", () => ({ default: "play2.png" }));

//Mockujemo HitBoard
vi.mock("../components/HitBoard", () => ({
  __esModule: true,
  default: ({ boardName, onCount, onSetNumberOfHittedShips }: any) => (
    <div data-testid={`hitboard-${boardName}`} onClick={() => {
      onCount(1);
      onSetNumberOfHittedShips(boardName);
    }}>
      {boardName}
    </div>
  ),
}));

const generateBoard = (): Cell[][] =>
  Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => ({
        hasShip: false,
        isHit: false,
        shipNextTo: false
    }))
);

describe("Game component", () => {
    const setCounter = vi.fn();
    const onSetNumberOfHittedShips = vi.fn();

    it("renders two HitBoard components", () => {
        render(
        <Game
            counter={0}
            setCounter={setCounter}
            board1={generateBoard()}
            board2={generateBoard()}
            board3={generateBoard()}
            board4={generateBoard()}
            setBoard3={vi.fn()}
            setBoard4={vi.fn()}
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
        />
        );

        expect(screen.getByTestId("hitboard-board3")).toBeInTheDocument();
        expect(screen.getByTestId("hitboard-board4")).toBeInTheDocument();
    });

    it("displays play1 image when counter is even", () => {
        render(
        <Game
            counter={2}
            setCounter={setCounter}
            board1={generateBoard()}
            board2={generateBoard()}
            board3={generateBoard()}
            board4={generateBoard()}
            setBoard3={vi.fn()}
            setBoard4={vi.fn()}
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
        />
        );

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "play1.png");
    });

    it("displays play2 image when counter is odd", () => {
        render(
        <Game
            counter={3}
            setCounter={setCounter}
            board1={generateBoard()}
            board2={generateBoard()}
            board3={generateBoard()}
            board4={generateBoard()}
            setBoard3={vi.fn()}
            setBoard4={vi.fn()}
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
        />
        );

        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "play2.png");
    });

    it("calls onCount and onSetNumberOfHittedShips when HitBoard is clicked", () => {
        render(
        <Game
            counter={0}
            setCounter={setCounter}
            board1={generateBoard()}
            board2={generateBoard()}
            board3={generateBoard()}
            board4={generateBoard()}
            setBoard3={vi.fn()}
            setBoard4={vi.fn()}
            onSetNumberOfHittedShips={onSetNumberOfHittedShips}
        />
        );

        fireEvent.click(screen.getByTestId("hitboard-board4"));

        expect(setCounter).toHaveBeenCalledOnce();
        expect(onSetNumberOfHittedShips).toHaveBeenCalledWith("board4");
    });
});
