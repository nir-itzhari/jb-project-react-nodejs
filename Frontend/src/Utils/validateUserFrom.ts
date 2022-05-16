import { object, string } from "yup"
import * as Yup from "yup"

class validateUserForm {

    public validateLoginSchema = object({

        username: string()
            .required("Username is required")
            .matches(/^[A-Za-z0-9]*$/, "White spaces and special characters are not allowed")
            .min(6, "Username should be minimum 6 characters")
            .max(30, "Username should be maximum 30 characters")
            .trim(),

        password: string()
            .required("Password is required")
            .matches(/^\S*$/, "White spaces are not allowed")
            .matches(/\d+/, "Password must contain minimum one number")
            .min(8, "Password should be minimum 8 characters")
            .max(15, "Password should be maximum 30 characters")
            .trim()
    })

    public validateRegisterSchema = object({
        firstName:
            string()
                .required("First Name is required")
                .matches(/^[A-Za-z -]*$/, "Numbers and Special characters are not allowed")
                .min(2, "First Name should be minimum 2 characters")
                .max(30, "First Name should be maximum 30 characters")
                .trim(),

        lastName:
            string()
                .required("Last Name is required")
                .matches(/^[A-Za-z -]*$/, "Numbers and Special characters are not allowed")
                .min(2, "Last Name should be minimum 2 characters")
                .max(30, "Last Name should be maximum 30 characters")
                .trim(),

        username: string()
            .required("Username is required")
            .matches(/^[A-Za-z0-9]*$/, "White spaces and special characters are not allowed")
            .min(6, "Username should be minimum 6 characters")
            .max(30, "Username should be maximum 30 characters")
            .trim(),

        password: string()
            .required("Password is required")
            .matches(/^\S*$/, "White spaces are not allowed")
            .matches(/\d+/, "Password must contain minimum one number")
            .min(8, "Password should be minimum 8 characters")
            .max(15, "Password should be maximum 30 characters")
            .trim(),

        confirmPassword:
            string()
                .required("Confirm Password is required")
                .oneOf([Yup.ref('password')], 'Password must be same!')
                .matches(/^\S*$/, "White spaces are not allowed")
                .matches(/\d+/, "Password must contain minimum one number")
                .min(8, "Password should be minimum 8 characters")
                .max(15, "Password should be maximum 30 characters")
                .trim()
    })


    public validateContactUsSchema = object({
        name:
            string()
                .required("Name is required")
                .matches(/[A-Za-z -]+$/i, "Numbers and Special characters are not allowed")
                .min(2, "Name should be minimum 2 characters")
                .max(30, "Name should be maximum 30 characters")
                .trim(),

        email:
            string()
                .required("Email is required")
                .email("Please enter valid email")
                .max(255)
                .trim(),

        subject:
            string()
                .required("Subject is required")
                .min(6, "Subject should be minimum 6 characters")
                .max(30, "Subject should be maximum 30 characters")
                .trim(),

        message:
            string()
                .required("Message is required")
                .max(255, "Message can contain 255 characters")
                .trim(),
    })

}
const validateForm = new validateUserForm();
export default validateForm