import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthServices";
import notify from "../../../Services/NotifyService";
import validateUserForm from "./../../../Utils/validateUserFrom";
import InputAdornment from '@material-ui/core/InputAdornment'
import { useEffect, useState } from "react";
import { FormControl, IconButton, Input, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Tooltip as MaterialToolTip } from "@mui/material";
import "./Register.css";
import config from "../../../Utils/Config";


function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserModel>({ resolver: yupResolver(validateUserForm.validateRegisterSchema), mode: "onChange" });
    const [hover, setClick] = useState<boolean>(false)
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showPassConfirm, SetShowPassConfirm] = useState<boolean>(false)


    async function submit(user: UserModel) {

        try {

            await authService.register(user);
            notify.success(`Welcome ${user.firstName} ${user.lastName}`);
            navigate("/vacations");

        }
        catch (err: any) {
            notify.error(err);
        }
    }

    useEffect(() => {
        window.document.title = "Travel | Register"
    }, [])

    return (
        <div className="RegisterWrapper animate__animated animate__fadeIn">

            <img src={config.vacationsImageUrl + "RegisterBackground.jpg"} />

            <div className="Register">

                <h2>Register</h2>

                <form onSubmit={handleSubmit(submit)}>
                    <TextField
                        title="First Name"
                        type="text"
                        error={errors.firstName?.message ? true : false}
                        label="First Name"
                        name="firstName"
                        autoComplete="off"
                        {...register("firstName")} />
                    <span className="ErrorMessage">{errors.firstName?.message}</span>

                    <TextField
                        type="text"
                        title="Last Name"
                        error={errors.lastName?.message ? true : false}
                        label="Last Name"
                        name="lastName"
                        autoComplete="off"
                        {...register("lastName")} />
                    <span className="ErrorMessage">{errors.lastName?.message}</span>

                    <TextField
                        type="text"
                        title="Username"
                        error={errors.username?.message ? true : false}
                        label="Username"
                        autoComplete="off"
                        {...register("username")} />
                    <span className="ErrorMessage">{errors.username?.message}</span>


                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            style={{ width: "100%" }}
                            error={errors.password?.message ? true : false}
                            type={showPass ? "text" : "password"}
                            title="Password"
                            name="password"
                            autoComplete="off"
                            {...register("password")}
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setShowPass(!showPass)}>
                                    <IconButton
                                        aria-label="toggle password visibility"

                                    >
                                        {!showPass ?
                                            <MaterialToolTip title="Show Passowrd">
                                                <VisibilityOff />
                                            </MaterialToolTip>
                                            :
                                            <MaterialToolTip title="Hide Passowrd">
                                                <Visibility />
                                            </MaterialToolTip>}

                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <span className="ErrorMessage">{errors.password?.message}</span>
                    
                    <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Input
                            id="standard-adornment-confirm-password"
                            style={{ width: "100%" }}
                            error={errors.confirmPassword?.message ? true : false}
                            type={showPassConfirm ? "text" : "password"}
                            name="ConfirmPassword"
                            autoComplete="off"
                            {...register("confirmPassword")}
                            endAdornment={
                                <InputAdornment position="end" onClick={() => SetShowPassConfirm(!showPassConfirm)}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                    >
                                        {!showPassConfirm ?
                                            <MaterialToolTip title="Show Password">
                                                <VisibilityOff />
                                            </MaterialToolTip>
                                            :
                                            <MaterialToolTip title="Hide Password">
                                                <Visibility />
                                            </MaterialToolTip>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <span className="ErrorMessage">{errors.confirmPassword?.message}</span>

                    <>

                        <Button className={hover ? "regBtn animate__animated animate__heartBeat" : "regBtn"} disabled={!isValid} onMouseEnter={() => setClick(!hover)} onMouseLeave={() => setClick(!hover)} type="submit" color="primary" variant="contained">
                            <MaterialToolTip title="Register">
                                <span>REGISTER</span>
                            </MaterialToolTip>
                        </Button>

                    </>

                    <span className="border border-1 border-primary bg-light text-center rounded">Already a member?
                        <MaterialToolTip title="Login">
                            <NavLink to={"/login"}> Login.</NavLink>
                        </MaterialToolTip>
                    </span>
                </form>

            </div>
        </div >
    );
}

export default Register;

