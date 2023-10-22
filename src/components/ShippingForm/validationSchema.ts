import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/, "Invalid phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zip_code: Yup.string()
    .matches(/^\d{5}$/, "Invalid ZIP code")
    .required("ZIP code is required"),
});
