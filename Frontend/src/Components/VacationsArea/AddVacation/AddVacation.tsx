import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify from "../../../Services/NotifyService";
import VacationModel from '../../../Models/VacationModel';
import { Button, TextField } from "@material-ui/core";
import vacationService from "../../../Services/VacationsServices";
import dayjs from 'dayjs'
import socketService from "../../../Services/SocketService";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import store from './../../../Redux/Store';
import validateVacationService from './../../../Utils/validateVacationForm';
import authService from "../../../Services/AuthServices";
import { Spinner } from "react-bootstrap";
import "./AddVacation.css";
import config from "../../../Utils/Config";

function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<VacationModel>({
        resolver: yupResolver(validateVacationService.validateVacationSchema), mode: "onChange"
    });
    const [click, setClick] = useState<boolean>(false);
    const [toDate, setToDate] = useState<string>();
    const [fromDate, setFromDate] = useState<string>();
    const navigate = useNavigate();
    const date = new Date();


    async function submit(vacation: VacationModel) {
        try {
            setClick(!click);
            const addedVacation = await vacationService.addNewVacation(vacation);

            socketService.sendNewVacation(addedVacation);
            notify.success("New Vacation Added");
            navigate("/vacations");
        }
        catch (error: any) {
            setClick(!click);
            if (error.response?.data.includes("image")) {
                notify.error("Vacation must have a Picture");
            } else {
                notify.error(error);
            }
        }
    }
    useEffect(() => {
        if (!authService.isLoggedIn()) {
            navigate("/login");
            return notify.error("You are not logged in");
        }
        if (store.getState().authState.user.role !== "Admin") {
            navigate("/home");
            return notify.error("You are not authorized");
        }
        window.document.title = "Travel | Add Vacation";
    }, [])


    return (
        <div className="AddVacationWrapper">
            <img src={config.vacationsImageUrl + "AddVacationBackground.jpg"} />
            <div className="AddVacation">
                <div className="formWrapper">
                    <form onSubmit={handleSubmit(submit)} className="animate__animated animate__fadeInDownBig">
                        <h2>Add New Vacation</h2>


                        <TextField
                            type="text"
                            error={errors.destination?.message ? true : false}
                            label="Destination"
                            name="destination"
                            autoComplete="off"
                            {...register("destination")}
                        />

                        <span className="ErrorMessage">{errors.destination?.message}</span>

                        <TextField
                            type="text"
                            error={errors.description?.message ? true : false}
                            label="Description"
                            name="description"
                            autoComplete="off"
                            {...register("description")} />

                        <span className="ErrorMessage">{errors.description?.message}</span>

                        <TextField
                            type="date"
                            error={errors.fromDate?.message ? true : false}
                            name="fromDate"
                            label="Arrival"
                            autoComplete="off"
                            defaultValue={dayjs(date).add(1, "day").format("YYYY-MM-DD")}
                            inputProps={{
                                min: dayjs(date).format("YYYY-MM-DD"),
                                max: dayjs(date).add(1, "year").format("YYYY-MM-DD"),
                            }}
                            {...register("fromDate", { onChange: (e) => setFromDate(e.target.value) })} />

                        <span className="ErrorMessage">{errors.fromDate?.message}</span>


                        <TextField
                            type="date"
                            error={errors.toDate?.message ? true : false}
                            name="toDate"
                            label="Return"
                            autoComplete="off"
                            defaultValue={dayjs(date).add(1, "day").format("YYYY-MM-DD")}
                            inputProps={{
                                min: fromDate,
                                max: dayjs(date).add(1, "year").format("YYYY-MM-DD"),
                            }}
                            {...register("toDate", { onChange: (e) => setToDate(e.target.value) })} />

                        <span className="ErrorMessage">{errors.toDate?.message}</span>

                        <TextField
                            type="number"
                            error={errors.price?.message ? true : false}
                            label="Price"
                            name="price"
                            autoComplete="off"
                            {...register("price")} />
                        <span className="ErrorMessage">{errors.price?.message}</span>

                        <label>Image: </label>
                        <input className="form-control form-control-sm" accept="image/jpeg, image/png" id="formFileSm" type="file"  {...register('image')} />
                        {/* <input type="file" className="inputFile" accept="image/jpeg, image/png" {...register('image')} /> */}
                        <span className="ErrorMessage">{errors.image?.message}</span>

                        {!isValid ?

                            <Button style={{ height: "30px" }} color="primary" type="submit" variant="contained" disabled>Add</Button>
                            :
                            <Button style={{ height: "30px" }} color="primary" type="submit" variant="contained" disabled={click}>{click ? <Spinner animation="border" /> : "Add"}</Button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddVacation;
