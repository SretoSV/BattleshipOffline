import { render, screen, fireEvent } from "@testing-library/react";
import Start from "../components/Start";
import { vi } from "vitest";

vi.mock("../images/ship1.png", () => ({ default: "ship1.png" }));
vi.mock("../images/vs.png", () => ({ default: "vs.png" }));
vi.mock("../images/ship2.png", () => ({ default: "ship2.png" }));

describe("Start component", () => {
    const mockOnPlay = vi.fn();

    it("shows 3 images", () => {
        render(<Start onPlay={mockOnPlay} />);
        
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(3);
        
        expect(images[0]).toHaveAttribute("src", "ship1.png");
        expect(images[1]).toHaveAttribute("src", "vs.png");
        expect(images[2]).toHaveAttribute("src", "ship2.png");
    });

    it("clicking on the button calls onPlay", () => {
        render(<Start onPlay={mockOnPlay} />);
        
        const button = screen.getByRole("button", { name: /play/i });
        fireEvent.click(button);
        
        expect(mockOnPlay).toHaveBeenCalledTimes(1);
    });
});
