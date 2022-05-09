import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import "./signup.css";
import { Link } from "react-router-dom";
import { signupUser } from "../../Services/signupService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Invalid phone number")
    .nullable(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      `8 Characters, Uppercase,
       Lowercase and Number`
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password Confirmation is required"),
});

const SignupForm = () => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate(redirect);
  }, [redirect, auth, navigate]);

  const onSubmit = async (values) => {
    const userData = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    try {
      const { data } = await signupUser(userData);
      setAuth(data);
      localStorage.setItem("authState", JSON.stringify(data));
      toast.success("You are signed up successfully");
      navigate(redirect);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="formContainer">
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          type="password"
          name="password"
          label="Password"
        />
        <Input
          formik={formik}
          type="password"
          name="passwordConfirm"
          label="Password Confirmation"
        />
        <button
          style={{ width: "100%" }}
          className="btn primary"
          disabled={!formik.isValid}
          type="submit"
        >
          Sign Up
        </button>
        <Link to={`/login/?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Already Login?</p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
