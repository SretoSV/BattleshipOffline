import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableCell from "../components/DroppableCell";
import type { Cell } from "../types/CellTypes";
import type { Ship } from "../types/ShipTypes";
import { useDrop } from "react-dnd";

vi.mock("react-dnd", async () => {
  const actual = await vi.importActual<any>("react-dnd");
  return {
    ...actual,
    useDrop: vi.fn(),
  };
});

const renderWithDnd = (ui: React.ReactElement) => {
  return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
};

describe("DroppableCell", () => {
    const mockDrop = vi.fn();
    const mockOnDropShip = vi.fn();
    let board: Cell[][];

    beforeEach(() => {
        mockDrop.mockReset();
        mockOnDropShip.mockReset();
        board = Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => ({ 
            hasShip: false,
            isHit: false,
            shipNextTo: false,
        }))
        );
    });

    it("renders with default backgroundColor", () => {
        (useDrop as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce([
        { isOver: false },
        mockDrop,
        ]);

        const { container } = renderWithDnd(
        <DroppableCell
            row={0}
            col={0}
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board1"
        />
        );

        const cell = container.firstChild as HTMLElement;
        expect(cell).toHaveStyle("background-color: #EFEFEF");
        expect(cell).toHaveStyle("border: 2px solid #1b4f74");
    });

    it("renders with blue background when isOver is true and boardName is board1", () => {
        (useDrop as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce([
        { isOver: true },
        mockDrop,
        ]);

        const { container } = renderWithDnd(
        <DroppableCell
            row={0}
            col={0}
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board1"
        />
        );

        const cell = container.firstChild as HTMLElement;
        expect(cell).toHaveStyle("background-color: #2488cf");
    });

    it("renders with blue background when isOver is true and boardName is board1", () => {
        (useDrop as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce([
        { isOver: true },
            mockDrop,
        ]);

        const { container } = renderWithDnd(
        <DroppableCell
            row={0}
            col={0}
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board1"
        />
        );

        const cell = container.firstChild as HTMLElement;
        expect(cell).toHaveStyle("background-color: #2488cf");
    });

    it("renders with red background when isOver is true and boardName is board2", () => {
        (useDrop as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce([
            { isOver: true },
            mockDrop,
        ]);

        const { container } = renderWithDnd(
        <DroppableCell
            row={0}
            col={0}
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board2"
        />
        );

        const cell = container.firstChild as HTMLElement;
        expect(cell).toHaveStyle("background-color: #ff0000");
    });

    it("calls onDropShip when drop is valid (horizontal, no overlap, in bounds)", () => {
        const testShip: Ship = {
            id: 1,
            size: 3,
            orientation: "horizontal",
            hitCounter: 0,
        };

        const dropItem = { ...testShip, clickedIndex: 0 };

        //rucno pokrecemo drop funkciju iz mockovanog useDrop
        (useDrop as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce((specFactory) => {
            const spec = specFactory();
            spec.drop(dropItem); //direktno testiramo drop logiku
            return [{ isOver: false }, vi.fn()];
        });

        renderWithDnd(
        <DroppableCell
            row={1}
            col={1}
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board2"
        />
        );

        expect(mockOnDropShip).toHaveBeenCalledWith(1, 1, dropItem);
    });

    it("does NOT call onDropShip when overlap exists", () => {
        board[1][2].hasShip = true;

        const testShip: Ship = {
            id: 1,
            size: 3,
            orientation: "horizontal",
            hitCounter: 0,
        };

        const dropItem = { ...testShip, clickedIndex: 0 };

        (useDrop as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce((specFactory) => {
            const spec = specFactory();
            spec.drop(dropItem);
            return [{ isOver: false }, vi.fn()];
        });

        renderWithDnd(
        <DroppableCell
            row={1}
            col={1}
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board2"
        />
        );

        expect(mockOnDropShip).not.toHaveBeenCalled();
    });

    it("does NOT call onDropShip when out of bounds", () => {
        const testShip: Ship = {
            id: 1,
            size: 5,
            orientation: "horizontal",
            hitCounter: 0,
        };

        const dropItem = { ...testShip, clickedIndex: 0 };

        (useDrop as unknown as ReturnType<typeof vi.fn>).mockImplementationOnce((specFactory) => {
            const spec = specFactory();
            spec.drop(dropItem);
            return [{ isOver: false }, vi.fn()];
        });

        renderWithDnd(
        <DroppableCell
            row={0}
            col={8} //8 + 5 > 10 => out of bounds
            onDropShip={mockOnDropShip}
            board={board}
            boardName="board1"
        />
        );

        expect(mockOnDropShip).not.toHaveBeenCalled();
    });
});
