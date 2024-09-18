import eyeIcon from "../../assets/images/eyeIcon.svg";
import eyeSlashIcon from "../../assets/images/eyeSlashIcon.svg";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginForm, showError } from "../../helper/Validation";
import { setAuthToken, showErrorMsg, showSuccessMsg } from "../../helper/utils";
import ShowPageTitle from "../common/ShowPageTitle";
import SpinnerButton from "../common/SpinnerButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.getAllUsers?.data ?? []);

  const togglePasswordShow = () => setPasswordShow(!isPasswordShow);

  const handleSubmit = (values) => {
    setLoading(true);

    setTimeout(() => {
      if (
        values?.email === "kishandetroja@gmail.com" &&
        values?.password === "Test@123"
      ) {
        showSuccessMsg("Login Successfully");
        setAuthToken("jGdb35k5asvHuk");
        navigate("/dashboard");
      } else {
        showErrorMsg("Please enter valid credentials.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gray-50 font-[sans-serif] login-page">
      <ShowPageTitle title={"login"} />

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className=" color-text-red text-center text-2xl font-bold mb-3">
              Login to Account
            </h2>
            <span className="mt-1 text-gray-500 flex justify-center text-center text-sm ">
              Please enter your email and password to continue
            </span>
            <Formik
              initialValues={{
                email: "kishandetroja@gmail.com",
                password: "Test@123",
              }}
              validationSchema={loginForm}
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
                <Form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        autoComplete="email"
                        value={values?.email ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        className="input-field p-2"
                      />
                    </div>
                    {touched.email && showError(errors.email)}
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        id="password"
                        name="password"
                        type={isPasswordShow ? "text" : "password"}
                        autoComplete="current-password"
                        value={values?.password ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="input-field pr-10 p-2"
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

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm text-gray-800"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>

                  <div className="!mt-8">
                    <SpinnerButton
                      className="flex justify-center w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      title={"Sign in"}
                      action={() => {}}
                      type={"submit"}
                      loading={isLoading}
                    />
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Create Account
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
