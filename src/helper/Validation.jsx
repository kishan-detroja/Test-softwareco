import * as yup from "yup";

const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const amountFormat = /^\d+\.\d{2,10}$/;

export const showError = (value) => (
  <span className="text-red-500">{value}</span>
);

export const loginForm = yup.object({
  email: yup
    .string()
    .matches(emailFormat, "Invalid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .matches(/\S+/, "Password can't be blank.")
    .required("Password is required."),
});

export const forgotPasswordForm = yup.object({
  email: yup
    .string()
    .matches(emailFormat, "Invalid email address.")
    .required("Email is required."),
});

export const registerForm = yup.object({
  username: yup
    .string()
    .required("Username is required.")
    .max(
      100,

      "Username may not be greater than 100 characters."
    )
    .min(3, "Username should be minimum 3 characters long."),
  email: yup
    .string()
    .matches(emailFormat, "Invalid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Number and One Special Case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm password required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const projectForm = yup.object({
  customer: yup
    .string()
    .required("Customer is required.")
    .min(3, "Customer should be minimum 3 characters long."),
  refnumber: yup.string().required("Reference number is required."),
  projectname: yup
    .string()
    .required("Project name is required.")
    .min(3, "Project name should be minimum 3 characters long."),
  projectnumber: yup.string().required("Project number is required."),
  arealocation: yup.string().required("Area location is required."),
  address: yup.string().required("Address is required."),
  duedate: yup.string().required("Due date is required."),

  contact: yup.number().required("Contact is required."),
  manager: yup.string().required("Manager is required."),
  staff: yup.string().required("Staff is required."),
  status: yup.string().required("Status is required."),
  email: yup
    .string()
    .matches(emailFormat, "Invalid email address.")
    .required("Email is required."),
});

export const estimateForm = yup.object({
  section: yup.array().of(
    yup.object({
      sectionName: yup.string().required("Section name is required."),
      sectionTotal: yup
        .string()
        .required("Total is required"),
      items: yup.array().of(
        yup.object({
          name: yup.string().required("Name is required."),
          description: yup.string().required("Description is required."),
          unit: yup.string().required("Unit is required."),
          quantity: yup.string().required("Quantity is required."),
          price: yup.string().required("Price is required."),
          margin: yup.string().required("Margin is required."),
          total: yup.string().required("Total is required."),
        })
      ),
    })
  ),
});
