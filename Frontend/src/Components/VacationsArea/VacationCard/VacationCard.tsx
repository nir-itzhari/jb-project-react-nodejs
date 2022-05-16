import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { Badge } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import vacationService from './../../../Services/VacationsServices';
import socketService from './../../../Services/SocketService';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import followersServices from "../../../Services/FollowersServices";
import store from "../../../Redux/Store";
import { updateVacationAction } from "../../../Redux/VacationsState";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DeleteForeverRounded, Edit } from "@material-ui/icons";
import UserModel from "../../../Models/UserModel";
import notify from "../../../Services/NotifyService";
import "./VacationCard.css";


interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState<UserModel>(null)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleFollow = async () => {
        try {
            if (!props.vacation.isFollowed) {
                props.vacation.amountOfFollowers++;
                props.vacation.isFollowed = true;
                await followersServices.follow({ vacationId: props.vacation.vacationId, destination: props.vacation.destination, amountOfFollowers: props.vacation.amountOfFollowers });
                store.dispatch(updateVacationAction(props.vacation));
                notify.success("Vacation was moved to the top of the list");
            }
            else {
                props.vacation.amountOfFollowers--;
                props.vacation.isFollowed = false;
                await followersServices.unFollow({ vacationId: props.vacation.vacationId, destination: props.vacation.destination, amountOfFollowers: props.vacation.amountOfFollowers });
                store.dispatch(updateVacationAction(props.vacation));
            }

        } catch (error) {
            notify.error(error);
        }
    };


    const handleDelete = () => {
        try {
            handleClose();
            vacationService.deleteOneVacation(props.vacation.vacationId);
            socketService.deleteVacation(props.vacation.vacationId);
        } catch (error) {
            notify.error(error);
        }
    }


    useEffect(() => {
        setUser(store.getState().authState.user);
        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        return () => unsubscribeMe();
    }, [])

    return (
        <div className="VacationCard animate__animated animate__fadeIn">
            <div className="detailsWrapper">
                <div className="vacationDetails">

                    <div className="destination">{props.vacation.destination}</div>
                    <div className="p-3">{props.vacation.description}</div>
                    <div className="d-flex justify-content-evenly p-1">
                        <div className="departure"><FlightTakeoffIcon /> Arrival: {dayjs((props.vacation.fromDate)).format("DD/MM/YYYY")}</div>
                        <div className="landing"><FlightLandIcon /> Return: {dayjs((props.vacation.toDate)).format("DD/MM/YYYY")}</div>
                    </div>
                    <div className="d-flex justify-content-center text-danger p-1 fs-5"> Price: {props.vacation.price}$</div>
                    <div>
                        <img className="" src={`${config.vacationsImageUrl}${props.vacation.imageName}`} />
                    </div>
                </div>
                <div>
                    <div className="actionDiv" >

                        {user?.role !== "Admin" ?

                            <>
                                <Badge color="secondary" title="Amount of Followers" badgeContent={props.vacation.amountOfFollowers} showZero>{!props.vacation.isFollowed ?
                                    <AiOutlineStar onClick={() => handleFollow()} />
                                    :
                                    <AiFillStar onClick={() => handleFollow()} />}</Badge>
                            </>
                            :
                            <>
                                <OverlayTrigger
                                    key={"Edit"}
                                    placement={"top"}
                                    overlay={
                                        <Tooltip>
                                            <strong>Edit</strong>.
                                        </Tooltip>
                                    }>
                                    <Edit className="edit" onClick={() => navigate("/vacations/edit/" + props.vacation.vacationId)} />
                                </OverlayTrigger>

                                <OverlayTrigger
                                    key={"Delete"}
                                    placement={"top"}
                                    overlay={
                                        <Tooltip>
                                            <strong>Delete</strong>.
                                        </Tooltip>
                                    }
                                >
                                    <DeleteForeverRounded className="delete" onClick={handleShow} />
                                </OverlayTrigger>
                            </>
                        }
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to continue?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleDelete}>
                                Yes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </div>
        </div >
    );
}



export default VacationCard;
