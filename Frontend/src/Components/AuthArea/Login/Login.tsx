import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthServices";
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextField } from '@material-ui/core';
import notify from './../../../Services/NotifyService';
import validateUserForm from "./../../../Utils/validateUserFrom";
import { FormControl, Input, InputAdornment, InputLabel, Tooltip as MaterialToolTip } from "@mui/material";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./Login.css";
import config from "../../../Utils/Config";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<CredentialsModel>({ resolver: yupResolver(validateUserForm.validateLoginSchema), mode: "onChange" });
    const [hover, setHover] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);

    async function submit(credentials: CredentialsModel): Promise<void> {
        try {
            await authService.login(credentials);
            notify.success(`Welcome ${credentials.username} <br /> Logged in successfully`);
            navigate("/vacations");
            return
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    useEffect(() => {
        window.document.title = "Travel | Login"
    }, [])

    return (
        <div className="LoginWrapper animate__animated animate__fadeIn">

            <img src={config.vacationsImageUrl + "LoginBackground.jpg"} />

            <div className="Login">
                <h2>Login</h2>


                <form onSubmit={handleSubmit(submit)}>

                    <TextField
                        title="Username"
                        error={errors.username?.message ? true : false}
                        type="text"
                        label="Username"
                        name="username"
                        autoComplete="off"
                        {...register("username")}
                    />

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

                    <>

                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            disabled={!isValid}
                            className={hover ? " animate__animated animate__heartBeat button" : "button"}
                            onMouseEnter={() => setHover(!hover)}
                            onMouseLeave={() => setHover(!hover)}>

                            Login
                        </Button>

                    </>
                    <span className="border border-1 border-primary bg-light text-center rounded">Not a member yet?
                        <MaterialToolTip title="Register">
                            <NavLink to={"/register"}> Register.</NavLink>
                        </MaterialToolTip></span>
                </form>


            </div>
        </div >

    );
}

export default Login;
