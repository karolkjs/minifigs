import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { rebrickableApi } from "../../api";
import { RebrickableMiniFigPart } from "../../types";
import Loader from "../Loader";
import ErrorBlock from "../ErrorBlock";

import Part from "./Part";

interface ExtendedSectionProps {
  numberOfParts: number;
  figId: string;
  setParts: any;
  parts: RebrickableMiniFigPart[] | undefined;
}

const ExtendedSection = ({
  numberOfParts,
  figId,
  setParts,
  parts,
}: ExtendedSectionProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { t } = useTranslation();

  const getParts = async () => {
    try {
      setLoading(true);
      const response = await rebrickableApi.get(`/minifigs/${figId}/parts/`);

      setParts(response.data.results);

      if (error) {
        setError(false);
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderParts = () => {
    if (loading) {
      return (
        <div className="mt-7 self-center">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full items-center mt-5 h-full">
          <ErrorBlock onClickRetry={getParts} retryLoading={loading} textColor="#000" />
        </div>
      );
    }

    return parts?.map((part) => (
      <Part
        key={part.part.part_num}
        imgUrl={part.part.part_img_url}
        name={part.part.name}
        partNum={part.part.part_num}
      />
    ));
  };

  useEffect(() => {
    if (!parts) {
      getParts();
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-start" data-testid="extended-section">
      <span className="text-black font-semibold mt-5">
        {t("numberOfParts", { num: numberOfParts })}:
      </span>
      {renderParts()}
    </div>
  );
};

export default ExtendedSection;
