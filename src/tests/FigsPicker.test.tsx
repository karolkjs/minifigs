import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import FigsPicker from "../components/FigsPicker";
import { MiniFig } from "../types";

const mockFigs: MiniFig[] = [
  {
    name: "Fig 1",
    set_num: "1234",
    set_img_url: "https://example.com/fig1.jpg",
    num_parts: 10,
    parts: [],
    set_url: "test",
    last_modified_dt: Date.now().toString(),
  },
  {
    name: "Fig 2",
    set_num: "5678",
    set_img_url: "https://example.com/fig2.jpg",
    num_parts: 20,
    parts: [],
    set_url: "test2",
    last_modified_dt: Date.now().toString(),
  },
];

describe("FigsPicker", () => {
  it("renders the fig cards", () => {
    render(
      <FigsPicker
        figs={mockFigs}
        setSelectedFig={() => {}}
        selectedFig={null}
        setParts={() => {}}
      />
    );
    const fig1Element = screen.getByText("Fig 1");
    const fig2Element = screen.getByText("Fig 2");
    
    expect(fig1Element).toBeInTheDocument();
    expect(fig2Element).toBeInTheDocument();
  });

  it("calls the setSelectedFig function when a fig card is clicked", () => {
    const setSelectedFig = jest.fn();
    render(
      <FigsPicker
        figs={mockFigs}
        setSelectedFig={setSelectedFig}
        selectedFig={null}
        setParts={() => {}}
      />
    );
    const fig1Element = screen.getByText("Fig 1");
    fireEvent.click(fig1Element);

    expect(setSelectedFig).toHaveBeenCalledWith(mockFigs[0]);
  });

  it("renders the selected fig card in the modal", () => {
    const selectedFig = mockFigs[0];
    render(
      <FigsPicker
        figs={mockFigs}
        setSelectedFig={() => {}}
        selectedFig={selectedFig}
        setParts={() => {}}
      />
    );
    const fig1Element = screen.getByText("Fig 1");
    fireEvent.click(fig1Element);
    const modalFigElement = screen.getByText("Fig 1");

    expect(modalFigElement).toBeInTheDocument();
  });
});
