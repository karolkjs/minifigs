import { useTranslation } from "react-i18next";

import Button from "../../components/Button";
import { CHOOSE_PATH } from "../paths";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl mb-20 select-none text-center">
        {t("landingMessage")}
      </h1>
      <Button url={CHOOSE_PATH}>{t('landingButton')}</Button>
    </div>
  );
};

export default Home;
