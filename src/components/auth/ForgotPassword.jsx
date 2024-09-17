import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { forgotPasswordForm, showError } from "../../helper/Validation";
import ShowPageTitle from "../common/ShowPageTitle";
import SpinnerButton from "../common/SpinnerButton";

const ForgotPassword = () => {
  const handleSubmit = (values) => {};

  return (
    <div className="bg-gray-50 font-[sans-serif] login-page">
      <ShowPageTitle title={"login"} />

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Forgot Password
            </h2>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={forgotPasswordForm}
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
                <Form className="space-y-6 mt-5" onSubmit={handleSubmit}>
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

                  <div className="!mt-8">
                    <SpinnerButton
                      className="flex justify-center w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      title={"Send Email"}
                      action={() => {}}
                      type={"submit"}
                      loading={false}
                    />
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    <Link
                      to="/login"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Login here
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

export default ForgotPassword;
