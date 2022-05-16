import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthServices";
import notify from "../../../Services/NotifyService";
import socketService from "../../../Services/SocketService";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate()
    useEffect(() => {
        const user = store.getState().authState.user;
        authService.logout();
        socketService.disconnect();
        notify.success(`Good bye ${user.firstName} <br />  Logout successfully`);
        navigate("/home");

    }, [])

    return null
}

export default Logout;
