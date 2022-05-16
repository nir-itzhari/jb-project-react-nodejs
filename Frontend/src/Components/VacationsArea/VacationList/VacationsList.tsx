import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import notify from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationsServices";
import VacationModel from './../../../Models/VacationModel';
import authService from "../../../Services/AuthServices";
import { useNavigate } from 'react-router-dom';
import socketService from "../../../Services/SocketService";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../../../Redux/VacationsState";
import config from "../../../Utils/Config";
import { Spinner } from "react-bootstrap";
import { Suspense, lazy } from 'react';
import { TablePagination } from "@mui/material";
import "./VacationsList.css";
const VacationCard = lazy(() => import("../VacationCard/VacationCard"))


function VacationsList(): JSX.Element {
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationModel[]>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        if (!authService.isLoggedIn()) {
            return navigate("/login");
        }
        window.document.title = "Travel | Vacations";

        vacationService.fetchVacations()
            .then(vacations => {
                setVacations(vacations)
            })
            .catch(err => notify.error(err));


        socketService.getCreatedVacation((vacationFromServer: VacationModel): void => {

            store.dispatch(addVacationAction(vacationFromServer));
            notify.success(`Vacation to ${vacationFromServer.destination} was just added`);
        });

        socketService.getUpdatedVacation((vacationFromServer: VacationModel): void => {
            store.dispatch(updateVacationAction(vacationFromServer));
            notify.success(`Vacation to ${vacationFromServer.destination} was just updated`);
        });

        socketService.getDeletedVacationId((vacationId: string) => {
            const deletedVacation = store.getState().vacationsState.vacations.find(v => v.vacationId === vacationId)
            store.dispatch(deleteVacationAction(vacationId));
            notify.success(`Vacation to ${deletedVacation.destination} deleted`);
        });

        const unsubscribeMe = store.subscribe(() => {
            vacationService.fetchVacations()
                .then(vacations => {
                    vacations.sort((a, b) => (a.isFollowed === b.isFollowed) ? 0 : a.isFollowed ? -1 : 1)
                    setVacations([...vacations]);
                })
                .catch(err => notify.error(err))
        });

        return () => unsubscribeMe();
    }, [])


    return (
        <div className="VacationsWrapper animate__animated animate__fadeIn">
            <img src={config.vacationsImageUrl + "vacationsBackground.jpg"} />
            <div className="VacationsList" >
                <div></div>
                {vacations && vacations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((vacation) => {
                        return (
                            <Suspense key={vacation.imageName} fallback={<Spinner animation="border" />}>
                                <VacationCard key={vacation.vacationId} vacation={vacation} />
                            </Suspense>
                        );
                    })}
                <div style={{ height: "20px" }}></div>
                {vacations && <TablePagination className="pageRows"
                    rowsPerPageOptions={[4, 8, 16, 32]}
                    component="div"
                    count={vacations.length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage="Vacations Per Page"
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </div>
        </div >
    );
}

export default VacationsList;
