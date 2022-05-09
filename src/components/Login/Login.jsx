import Input from "../../common/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import "./login.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../Services/loginService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate(redirect);
  }, [redirect, auth, navigate]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      localStorage.setItem("authState", JSON.stringify(data));
      toast.success("You are logged in successfully");
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
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          type="password"
          name="password"
          label="Password"
        />
        <button
          style={{ width: "100%" }}
          className="btn primary"
          disabled={!formik.isValid}
          type="submit"
        >
          Login
        </button>
        <Link to={`/signup/?redirect=${redirect}`}>
          <p style={{ marginTop: "15px" }}>Not Sign Up Yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
