import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";
import { Tooltip as MaterialToolTip } from "@mui/material";

interface AuthMenuProps {
    handleCloseNavBar: () => void
}

function AuthMenu(args: AuthMenuProps): JSX.Element {
    const [user, setUser] = useState<UserModel>(null);
    useEffect(() => {

        setUser(store.getState().authState.user);

        const unSubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        })

        return () => unSubscribeMe();

    }, []);

    return (
        <div className="AuthMenu">
            {user === null ?
                <>
                    <span>Hello Guest |
                        <MaterialToolTip title="Login">
                            <NavLink className="login" to="/login" onClick={args.handleCloseNavBar} >Login</NavLink>
                        </MaterialToolTip>

                    </span>
                </>
                :
                <>
                    <span>Hello {user.firstName} {user.lastName}</span>
                    <span> | </span>

                    <MaterialToolTip title="Logout">
                        <NavLink to="/logout" onClick={args.handleCloseNavBar}>Logout</NavLink>
                    </MaterialToolTip>
                </>
            }
        </div >
    );
}

export default AuthMenu;