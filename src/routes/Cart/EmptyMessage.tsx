import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { CHOOSE_PATH } from "../paths";

const EmptyMessage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full items-center justify-center text-center">
      <p className="mb-5 text-2xl font-medium">{t("emptyCart")}</p>
      <Button url={CHOOSE_PATH}>{t("landingButton")}</Button>
    </div>
  );
};

export default EmptyMessage;
