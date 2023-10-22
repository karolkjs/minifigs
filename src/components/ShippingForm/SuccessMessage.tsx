import { useTranslation } from "react-i18next";

import Checkmark from "../../assets/checkmark.svg?react";
import Button from "../Button";

const SuccessMessage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full items-center justify-center text-center">
      <Checkmark width={80} height={80} className="text-sky-blue" />
      <p className="mb-5 text-2xl font-medium mt-5">{t("orderSuccess")}</p>
      <Button url="/">Return to homepage</Button>
    </div>
  );
};

export default SuccessMessage;
