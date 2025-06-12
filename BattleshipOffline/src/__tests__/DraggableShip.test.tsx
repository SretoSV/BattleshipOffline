// DraggableShip.test.tsx
import { render, fireEvent } from "@testing-library/react";
import DraggableShip from "../components/DraggableShip";
import { describe, it, expect, vi } from "vitest";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { Ship } from "../types/ShipTypes";

vi.mock("react-dnd", async () => {
  const actual = await vi.importActual<any>("react-dnd");
  return {
    ...actual, // koristi sve originalne funkcije...
    useDrag: vi.fn(() => {   // ...ali useDrag zameni mockovanim
      return [{ isDragging: false }, vi.fn((el) => el), vi.fn()];
    }),
  };
});

const renderWithDnd = (ui: React.ReactElement) => {
  return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
};

describe("DraggableShip", () => {
  const mockSetShips = vi.fn();
  const testShip: Ship = {
    id: 1,
    size: 3,
    orientation: "horizontal",
    hitCounter: 0,
  };

  it("renders correct number of ship parts", () => {
    const { getAllByTestId } = renderWithDnd( // getAllByTestId važi samo unutar renderovanog DOM stabla ovog poziva
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );
    const parts = getAllByTestId("ship-part");
    expect(parts).toHaveLength(3);

    //ili
    /*
      import { screen } from "@testing-library/react";
      renderWithDnd( <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" /> );
      const parts = screen.getAllByTestId("ship-part");
      expect(parts).toHaveLength(3);
    */
  });

  it("calls setShips on container click to rotate", () => {
    const { getByTestId } = renderWithDnd(
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );
    const container = getByTestId("ship-container");
    fireEvent.click(container);
    expect(mockSetShips).toHaveBeenCalled();
  });

  it("sets clickedIndex on mouse down", () => {
    const { getAllByTestId } = renderWithDnd(
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );
    const parts = getAllByTestId("ship-part");
    fireEvent.mouseDown(parts[2]);
    expect(parts[2]).toHaveAttribute("data-active", "true");
  });

  it("renders ship in horizontal orientation", () => {
    const testShip: Ship = {
      id: 1,
      size: 3,
      orientation: "horizontal",
      hitCounter: 0,
    };

    const { getByTestId } = renderWithDnd(
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );

    const container = getByTestId("ship-container");
    expect(container).toHaveStyle("flex-direction: row");
  });

  it("renders ship in vertical orientation", () => {
    const testShip: Ship = {
      id: 1,
      size: 3,
      orientation: "vertical",
      hitCounter: 0,
    };

    const { getByTestId } = renderWithDnd(
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );

    const container = getByTestId("ship-container");
    expect(container).toHaveStyle("flex-direction: column");
  });

  it("sets opacity to 0.5 when dragging", () => {
    // Mockuj useDrag da vrati isDragging: true
    (useDrag as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce([
      { isDragging: true },
      vi.fn((el) => el),
      vi.fn(),
    ]);

    const testShip: Ship = {
      id: 1,
      size: 3,
      orientation: "horizontal",
      hitCounter: 0,
    };

    const { getByTestId } = renderWithDnd(
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );

    const container = getByTestId("ship-container");
    expect(container).toHaveStyle("opacity: 0.5");
  });

  
  it("sets opacity to 1 when dragging", () => {
    const { getByTestId } = renderWithDnd(
      <DraggableShip ship={testShip} setShips={mockSetShips} boardName="board1" />
    );

    const container = getByTestId("ship-container");
    expect(container).toHaveStyle("opacity: 1");
  });
  
});