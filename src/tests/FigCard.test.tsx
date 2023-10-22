import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import FigCard from "../components/FigCard";

jest.mock("../api/rebrickableApi", () => jest.fn());
jest.mock("../api/mockApi", () => jest.fn());
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));

describe("FigCard", () => {
  const props = {
    imgUrl: "https://example.com/image.jpg",
    name: "Test Fig",
    numberOfParts: 10,
    figId: "123",
    setParts: jest.fn(),
    parts: [],
    onClick: jest.fn(),
    onClickFigDetails: jest.fn(),
    active: false,
    extended: false,
    scrollable: false,
  };

  it("renders the component with the correct props", () => {
    render(<FigCard {...props} />);
    const figName = screen.getByText(props.name);
    const img = screen.getByAltText(`${props.name} fig`);
    const showDetails = screen.getByTestId("show-details-button");
    
    expect(figName).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(showDetails).toBeInTheDocument();
  });

  it("truncates the name if it is too long", () => {
    const longName = "This is a really long name that should be truncated";
    render(<FigCard {...props} name={longName} />);
    const figName = screen.getByText("This is a really long name ...");

    expect(figName).toBeInTheDocument();
  });

  it("renders the extended section when extended", () => {
    render(<FigCard {...props} extended />);
    const extendedSection = screen.getByTestId("extended-section");

    expect(extendedSection).toBeInTheDocument();
  });

  it("renders the parts list in the extended section", () => {
    const parts = [
      {
        id: 1,
        inv_part_id: 123,
        part: {
          part_num: "1234",
          name: "Brick 1x1",
          part_cat_id: 1,
          part_url: "https://example.com/parts/1234",
          part_img_url: "https://example.com/parts/1234.jpg",
          external_ids: {
            BrickOwl: ["1234"],
            BrickLink: ["1234"],
            Lego: ["1234"],
          },
          color: {
            id: 1,
            name: "Red",
            rgb: "#FF0000",
            is_trans: false,
            external_ids: {
              BrickLink: [4],
              Lego: [5],
            },
          },
          set_num: "123-1",
          quantity: 10,
          is_spare: false,
          element_id: "1234",
          num_sets: 5,
        },
      },
      {
        id: 2,
        inv_part_id: 456,
        part: {
          part_num: "2345",
          name: "Brick 2x2",
          part_cat_id: 1,
          part_url: "https://example.com/parts/2345",
          part_img_url: "https://example.com/parts/2345.jpg",
          external_ids: {
            BrickOwl: ["2345"],
            BrickLink: ["2345"],
            Lego: ["2345"],
          },
          color: {
            id: 2,
            name: "Blue",
            rgb: "#0000FF",
            is_trans: false,
            external_ids: {
              BrickLink: [7],
              Lego: [8],
            },
          },
          set_num: "123-1",
          quantity: 5,
          is_spare: true,
          element_id: "2345",
          num_sets: 2,
        },
      },
    ];
    render(<FigCard {...props} extended parts={parts} />);
    const part1 = screen.getByText("Brick 1x1");
    const part2 = screen.getByText("Brick 2x2");

    expect(part1).toBeInTheDocument();
    expect(part2).toBeInTheDocument();
  });

  it("calls the onClickFigDetails function when show details is clicked", () => {
    render(<FigCard {...props} />);
    const showDetails = screen.getByTestId("show-details-button");
    fireEvent.click(showDetails);

    expect(props.onClickFigDetails).toHaveBeenCalled();
  });
});
