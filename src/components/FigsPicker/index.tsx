import { useState } from "react";

import FigCard from "../FigCard";
import { MiniFig } from "../../types";
import PopUpModal from "../PopUpModal";

interface FigsPickerProps {
  figs: MiniFig[];
  setSelectedFig: (fig: MiniFig) => void;
  selectedFig: MiniFig | null;
  setParts: any;
}

const FigsPicker = ({
  figs,
  setSelectedFig,
  selectedFig,
  setParts,
}: FigsPickerProps) => {
  const [showModal, setShowModal] = useState(false);

  const renderFigs = () => {
    return figs.map((fig: MiniFig) => {
      const isActive = selectedFig?.set_num === fig.set_num;

      const onClickFig = () => setSelectedFig(fig);
      const onClickFigDetails = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        e.stopPropagation();
        onClickFig();
        setShowModal(true);
      };

      return (
        <FigCard
          key={fig.name}
          imgUrl={fig.set_img_url}
          name={fig.name}
          numberOfParts={fig.num_parts}
          figId={fig.set_num}
          active={isActive}
          onClick={onClickFig}
          onClickFigDetails={onClickFigDetails}
          setParts={setParts}
        />
      );
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col sm:flex-row mb-10 w-full gap-4 items-center justify-center">
          {renderFigs()}
        </div>
      </div>
      <PopUpModal show={showModal} setShow={setShowModal}>
        {selectedFig && (
          <FigCard
            key={selectedFig?.name}
            imgUrl={selectedFig?.set_img_url}
            name={selectedFig?.name}
            numberOfParts={selectedFig?.num_parts}
            figId={selectedFig?.set_num}
            extended={true}
            parts={selectedFig?.parts}
            setParts={setParts}
            scrollable
          />
        )}
      </PopUpModal>
    </>
  );
};

export default FigsPicker;
