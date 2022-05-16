import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";
import validateVacationService from "../../../Utils/validateVacationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import vacationService from './../../../Services/VacationsServices';
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthServices";
import { Spinner } from "react-bootstrap";
import config from "../../../Utils/Config";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {
    const params = useParams();
    const id = params.id;
    const [click, setClick] = useState<boolean>(false);
    const [toDate, setToDate] = useState<string>();
    const [fromDate, setFromDate] = useState<string>();

    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<VacationModel>({ resolver: yupResolver(validateVacationService.validateVacationSchema), mode: "onChange" });
    const navigate = useNavigate();
    const date = new Date();
    async function submit(vacation: VacationModel) {

        try {
            setClick(!click);

            vacation.vacationId = id;

            const updatedVacation = await vacationService.updateVacation(vacation);

            socketService.sendUpdatedVacation(updatedVacation);

            notify.success("Vacation has been updated");
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
            navigate("/login")
            return notify.error("You are not logged in");
        }
        if (store.getState().authState.user.role !== "Admin") {
            navigate("/home")
            return notify.error("You are not authorized");
        }


        window.document.title = "Travel | Update Vacation";
        vacationService.getOneVacation(id)
            .then(vacation => {
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("fromDate", dayjs(vacation.fromDate).format("YYYY-MM-DD"));
                setValue("toDate", dayjs(vacation.toDate).format("YYYY-MM-DD"));
                setValue("price", vacation.price);


            })
            .catch(err => notify.error(err));
    }, [])

    return (

        <div className="UpdateVacationWrapper">
            <img src={config.vacationsImageUrl + "AddVacationBackground.jpg"} />
            <div className="UpdateVacation">
                <div className="formWrapper">

                    <form onSubmit={handleSubmit(submit)} className="animate__animated animate__fadeInDownBig">

                        <h2>Update Vacation</h2>

                        <TextField
                            type="text"
                            variant="standard"
                            label="Destination"
                            title="Destination"
                            name="destination"
                            autoComplete="off"
                            {...register("destination")}
                        />

                        <span className="ErrorMessage">{errors.destination?.message}</span>

                        <TextField
                            type="text"
                            variant="standard"
                            title="Description"
                            label="Description"
                            name="description"
                            autoComplete="off"
                            {...register("description")} />

                        <span className="ErrorMessage">{errors.description?.message}</span>

                        <TextField
                            type="date"
                            name="fromDate"
                            label="Arrival"
                            title="Departure Date and Time"
                            variant="standard"
                            autoComplete="off"
                            inputProps={{
                                min: dayjs(date).format("YYYY-MM-DD"),
                                max: dayjs(date).add(1, "year").format("YYYY-MM-DD"),
                            }}
                            {...register("fromDate", { onChange: (e) => setFromDate(e.target.value) })} />

                        <span className="ErrorMessage">{errors.fromDate?.message}</span>


                        <TextField
                            type="date"
                            name="toDate"
                            label="Return"
                            title="Landing Date and Time"
                            variant="standard"
                            autoComplete="off"
                            inputProps={{
                                min: fromDate,
                                max: dayjs(date).add(1, "year").format("YYYY-MM-DD"),
                            }}
                            {...register("toDate", { onChange: (e) => setToDate(e.target.value) })} />

                        <span className="ErrorMessage">{errors.toDate?.message}</span>

                        <TextField
                            type="text"
                            title="Price"
                            variant="standard"
                            label="Price"
                            name="price"
                            autoComplete="off"
                            {...register("price")} />


                        <span className="ErrorMessage">{errors.price?.message}</span>
                        <label>Image: </label>
                        <input className="form-control form-control-sm" accept="image/jpeg, image/png" id="formFileSm" type="file"  {...register('image')} />
                        {/* <input type="file" accept="image/*" {...register('image')} /> */}
                        <span className="ErrorMessage">{errors.image?.message}</span>

                        {!isValid ?

                            <Button title="Update" style={{ height: "30px" }} color="primary" type="submit" variant="contained" disabled>Update</Button>
                            :
                            <Button title="Update" style={{ height: "30px" }} color="primary" type="submit" variant="contained" disabled={click}>{click ? <Spinner animation="border" /> : "Update"}</Button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateVacation;
