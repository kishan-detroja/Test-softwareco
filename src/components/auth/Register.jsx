import React, { useState } from "react";
import ShowPageTitle from "../common/ShowPageTitle";
import { Form, Formik } from "formik";
import {
  isValidObject,
  showErrorMsg,
  showSuccessMsg,
} from "../../helper/utils";
import { useNavigate } from "react-router";
import { registerForm, showError } from "../../helper/Validation";
import eyeIcon from "../../assets/images/eyeIcon.svg";
import eyeSlashIcon from "../../assets/images/eyeSlashIcon.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/users/registerUserSlice";
import SpinnerButton from "../common/SpinnerButton";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isResetPasswordShow, setResetPasswordShow] = useState(false);

  const isLoading = useSelector(
    (state) => state?.registerUser?.loading ?? false
  );

  const togglePasswordShow = () => setPasswordShow(!isPasswordShow);
  const toggleResetPasswordShow = () =>
    setResetPasswordShow(!isResetPasswordShow);

  const handleSubmit = (values) => {
    const formData = {
      username: values?.username ?? "",
      email: values?.email ?? "",
      password: values?.password ?? "",
    };
    dispatch(registerUser(formData)).then((data) => {
      if (isValidObject(data?.payload)) {
        showSuccessMsg("User Registered Successfully.");
        navigate("/login");
      } else {
        showErrorMsg("Something went wrong!");
      }
    });
  };
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 login-page">
      <ShowPageTitle title={"register"} />
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Register an Account
          </h2>
          <span className="mt-1 text-gray-500 flex justify-center text-center text-sm ">
            Create an Account to Continue
          </span>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={registerForm}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            errors,
            touched,
            validateField,
            validateForm,
            handleChange,
            values,
            handleSubmit,
            handleBlur,
          }) => (
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={values?.email ?? ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="Enter Email"
                    className="input-field"
                  />
                </div>
                {touched.email && showError(errors.email)}
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={values?.username ?? ""}
                    onChange={handleChange}
                    autoComplete="username"
                    onBlur={handleBlur}
                    placeholder="Enter Username"
                    className="input-field"
                  />
                  {touched.username && showError(errors.username)}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative mt-2 shadow-sm">
                    <input
                      type={isPasswordShow ? "text" : "password"}
                      name="password"
                      id="password"
                      value={values?.password ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-field pr-10"
                      placeholder="Enter Password"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <img
                        alt="eye"
                        src={isPasswordShow ? eyeIcon : eyeSlashIcon}
                        className="hover:cursor-pointer"
                        onClick={() => togglePasswordShow()}
                      />
                    </div>
                  </div>
                  {touched.password && showError(errors.password)}
                </div>
                <div>
                  <label
                    htmlFor="re-type-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm password
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="re-type-password"
                      name="confirmPassword"
                      type={isResetPasswordShow ? "text" : "password"}
                      value={values?.confirmPassword ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                      placeholder="Confirm Password"
                      className="input-field pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <img
                        alt="eye"
                        src={isResetPasswordShow ? eyeIcon : eyeSlashIcon}
                        className="hover:cursor-pointer"
                        onClick={() => toggleResetPasswordShow()}
                      />
                    </div>
                  </div>
                  {touched.confirmPassword && showError(errors.confirmPassword)}
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-gray-800 ml-3 block text-sm"
                  >
                    I accept the{" "}
                    <span className="text-blue-600 font-semibold hover:underline ml-1">
                      Terms and Conditions
                    </span>
                  </label>
                </div>
              </div>

              <div className="!mt-12">
                <SpinnerButton
                  className="flex justify-center w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  title={"Sign up"}
                  action={() => {}}
                  type={"submit"}
                  loading={isLoading}
                />
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
