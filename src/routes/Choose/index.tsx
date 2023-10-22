import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getRandomElements } from "../../utils/helpers";
import { rebrickableApi } from "../../api";
import {
  RebrickableMiniFig,
  RebrickableMiniFigResponse,
  RebrickableMiniFigPart,
} from "../../types";
import Button from "../../components/Button";
import FigsPicker from "../../components/FigsPicker";
import { CART_PATH } from "../paths";
import { MiniFig } from "../../types";
import { SET_CART } from "../../redux/types";
import Loader from "../../components/Loader";
import ErrorBlock from "../../components/ErrorBlock";

const Choose = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [figs, setFigs] = useState<MiniFig[]>([]);
  const [selectedFig, setSelectedFig] = useState<MiniFig | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setParts = (parts: RebrickableMiniFigPart[]) => {
    setFigs((prevState) => {
      const newFigs = [...prevState];
      const figIndex = newFigs.findIndex(
        (fig) => fig.set_num === selectedFig?.set_num
      );
      newFigs[figIndex] = { ...newFigs[figIndex], parts };
      return newFigs;
    });

    if (selectedFig) {
      setSelectedFig((prevState) => {
        if (prevState) {
          return { ...prevState, parts };
        }
        return null;
      });
    }
  };

  const getRandomFigs = async () => {
    try {
      setLoading(true);
      const response: RebrickableMiniFigResponse = await rebrickableApi.get(
        `/minifigs/?in_theme_id=${
          import.meta.env.VITE_REBRICKABLE_HARRY_POTTER_THEME_ID
        }`
      );
      const randomFigs: RebrickableMiniFig[] = getRandomElements(
        response.data.results,
        3
      );

      setFigs(randomFigs);

      if (error) {
        setError(false);
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onClickNext = () => {
    if (selectedFig) {
      dispatch({
        type: SET_CART,
        payload: selectedFig,
      });
      navigate(CART_PATH);
    }
  };

  useEffect(() => {
    getRandomFigs();
  }, []);

  const renderPicker = () => {
    if (loading) {
      return (
        <div className="mt-5">
          <Loader />
        </div>
      );
    }

    return (
      <FigsPicker
        figs={figs}
        setSelectedFig={setSelectedFig}
        selectedFig={selectedFig}
        setParts={setParts}
      />
    );
  };

  if (error) {
    return <ErrorBlock retryLoading={loading} onClickRetry={getRandomFigs} />;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold text-4xl mb-20 select-none">{t("chooseFig")}</h1>
      <div className="sm:h-[400px] w-full">{renderPicker()}</div>
      <Button onClick={onClickNext} disabled={!selectedFig}>
        {t("toCart")}
      </Button>
    </div>
  );
};

export default Choose;
