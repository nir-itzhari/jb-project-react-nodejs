import { Container, Nav, NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Navbar } from "react-bootstrap"
import "./Header.css";
import { useNavigate } from 'react-router-dom';
import ForestIcon from '@mui/icons-material/Forest';
import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { Tooltip as MaterialToolTip } from "@mui/material";

function Header(): JSX.Element {
    const [user, setUser] = useState<UserModel>(null);
    const navigate = useNavigate();
    const [closeNavBar, setCloseNavBar] = useState<boolean>(false);


    useEffect(() => {
        setUser(store.getState().authState.user);

        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        return () => unsubscribeMe();
    }, [])


    const handleCloseNavBar = () => {
        if (closeNavBar) {
            setCloseNavBar(!closeNavBar);
        }
        else {
            setCloseNavBar(closeNavBar);
        }
    }

    return (
        <div className="Header">
            <Navbar className="navbar" collapseOnSelect expanded={closeNavBar} expand="lg" bg="dark" variant="dark">

                <Container>

                    <MaterialToolTip title="Home">
                        <Navbar.Brand className="cursor-pointer" onClick={() => {
                            navigate("/home")
                            handleCloseNavBar()
                        }}>

                            <ForestIcon />TRAVEL
                        </Navbar.Brand>
                    </MaterialToolTip>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setCloseNavBar(closeNavBar ? false : true)} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {user !== null ?
                                <>
                                    <MaterialToolTip title="Vacations">
                                        <Nav.Link onClick={() => {
                                            navigate("/vacations")
                                            handleCloseNavBar()
                                        }} >
                                            Vacations
                                        </Nav.Link>
                                    </MaterialToolTip>

                                </> : ""}

                            {user !== null && user.role === "Admin" ?
                                <NavDropdown autoClose="inside" renderMenuOnMount={true} title="Services" id="collasible-nav-dropdown" menuVariant="dark">
                                    <NavDropdown.Item onClick={() => {
                                        navigate("/vacations/new")
                                        handleCloseNavBar()
                                    }}>
                                        Add Vacation
                                    </NavDropdown.Item>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item onClick={() => {
                                        navigate("/vacations/reports")
                                        handleCloseNavBar()
                                    }}>
                                        Reports
                                    </NavDropdown.Item>
                                </NavDropdown> : ""}

                            <Nav onClick={handleCloseNavBar}>

                                <Nav.Link onClick={() => navigate("/contact-us")}>
                                    <MaterialToolTip title="Contact Us">
                                        <span>Contact Us</span>
                                    </MaterialToolTip>
                                </Nav.Link>
                            </Nav>
                        </Nav>

                        <Nav className="navAuthMenu">
                            <AuthMenu handleCloseNavBar={handleCloseNavBar} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}


export default Header
