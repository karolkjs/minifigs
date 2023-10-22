import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { truncateText } from "../../utils/helpers";
import { RebrickableMiniFigPart } from "../../types";

import ExtendedSection from "./ExtendedSection";

interface FigCardProps {
  imgUrl: string;
  name: string;
  numberOfParts: number;
  figId: string;
  setParts: any;
  parts?: RebrickableMiniFigPart[] | undefined;
  onClick?: any;
  onClickFigDetails?: any;
  active?: boolean;
  extended?: boolean;
  scrollable?: boolean;
}

const TRUNCATED_MAX_CHARACTERS = 30;

const FigCard = ({
  imgUrl,
  name,
  onClick,
  onClickFigDetails,
  numberOfParts,
  figId,
  setParts,
  parts,
  active = false,
  extended = false,
  scrollable = false,
}: FigCardProps) => {
  const { t } = useTranslation();
  const truncatedName = truncateText(name, TRUNCATED_MAX_CHARACTERS);
  const figName =
    extended || name.length <= TRUNCATED_MAX_CHARACTERS ? name : truncatedName;

  const handleOnClick = () => {
    if (!extended) {
      return onClick();
    }
  };

  const renderFooter = () => {
    if (extended) {
      return (
        <ExtendedSection
          numberOfParts={numberOfParts}
          figId={figId}
          parts={parts}
          setParts={setParts}
        />
      );
    }

    return (
      <span
        className="text-orange font-semibold mt-auto select-none cursor-pointer"
        onClick={onClickFigDetails}
        data-testid="show-details-button"
      >
        {t("showDetails")}
      </span>
    );
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center text-center rounded-2xl p-5 overflow-hidden bg-white",
        {
          "shadow-[0_0px_18px_rgba(222,134,64,1)]": active,
          "cursor-pointer hover:shadow-[0_0px_18px_rgba(222,134,64,1)] transition-shadow w-full h-[350px]":
            !extended,
          "h-full": extended,
          "overflow-y-scroll appScrollbarContainer hiddenScrollbarContainer onHoverScrollbarContainer":
            scrollable,
        }
      )}
      onClick={handleOnClick}
    >
      <img
        src={imgUrl}
        alt={`${name} fig`}
        className={classNames({
          "max-h-[50%]": !extended,
          "max-h-[200px]": extended,
        })}
      />
      <span className="text-black font-semibold my-4 w-full">{figName}</span>
      {renderFooter()}
    </div>
  );
};

export default FigCard;
