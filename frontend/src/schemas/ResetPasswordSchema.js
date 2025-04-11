import * as yup from "yup";

const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character (!@#$%^&*)")
      .required("Password is required"),
  
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
})

export default passwordSchema;