import { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import { MiniFig } from "../../types";
import Button from "../Button";
import Summary from "./Summary";
import validationSchema from "./validationSchema";
import { ShippingFormValues } from "../../types";
import SuccessMessage from "./SuccessMessage";

interface ShippingFormProps {
  onSubmit: (values: ShippingFormValues) => any;
  cartState: MiniFig;
  setParts: any;
  setShowModal: (value: boolean) => void;
}

const ShippingForm = ({
  onSubmit,
  cartState,
  setParts,
  setShowModal,
}: ShippingFormProps) => {
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (values: ShippingFormValues) => {
    const response = await onSubmit(values);

    if (response.status === 201) {
      setSuccess(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phone_number: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  const hasErrors = Object.keys(formik.errors).length > 0;

  const renderInput = (name: string, value: string) => {
    const touched = formik.touched[name as keyof typeof formik.touched];
    return (
      <div className="flex flex-col w-full mb-5" key={name}>
        <label htmlFor={name} className="mb-3">
          {t(`forms.${name}`)}
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-11 w-full rounded-lg outline-none focus:outline-none text-black px-4"
        />
        {formik.errors[name as keyof typeof formik.errors] && touched && (
          <span className="text-pastel-red mt-2 text-sm">
            {formik.errors[name as keyof typeof formik.errors]}
          </span>
        )}
      </div>
    );
  };

  const renderInputs = () => {
    const { name, surname, state, zip_code, ...restValues } =
      formik.initialValues;

    const groupedInputs: any = {
      row1: ["name", "surname"],
      ...restValues,
      row2: ["state", "zip_code"],
    };

    return Object.keys(groupedInputs).map((key, index) => {
      if (Array.isArray(groupedInputs[key])) {
        return (
          <div className="flex justify-between gap-4 w-full" key={index}>
            {groupedInputs[key].map((inputName: string) =>
              renderInput(
                inputName,
                formik.values[inputName as keyof typeof formik.values]
              )
            )}
          </div>
        );
      } else {
        return renderInput(
          key,
          formik.values[key as keyof typeof formik.values]
        );
      }
    });
  };

  const onClickDetails = () => setShowModal(true);

  if (success) {
    return <SuccessMessage />;
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-between">
      <div className="flex flex-col md:w-[55%]">
        <h1 className="font-bold text-4xl mb-20 select-none">
          {t("shippingDetails")}
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
          {renderInputs()}
          <div className="md:hidden flex p-5 rounded-2xl my-5 bg-white justify-between">
            <img
              src={cartState.set_img_url}
              alt={`fig ${cartState.name}`}
              className="h-[80px]"
            />
            <span
              className="text-orange font-semibold mt-auto select-none cursor-pointer"
              onClick={onClickDetails}
            >
              {t("showDetails")}
            </span>
          </div>
          <div className="w-full md:self-end">
            <Button type="submit" disabled={hasErrors}>{t("submit")}</Button>
          </div>
        </form>
      </div>
      <Summary fig={cartState} setParts={setParts} />
    </div>
  );
};

export default ShippingForm;
