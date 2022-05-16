import store from './../../../Redux/Store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import UserModel from '../../../Models/UserModel';
import "./Home.css";

function Home(): JSX.Element {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserModel>(null);

    useEffect(() => {
        window.document.title = "Travel | Home";
        setUser(store.getState().authState.user);

        const unsubscribeMe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        return () => unsubscribeMe();
}, [])

return (
    <div className="wrapper">
        <div className="page-header section-dark">
            <div className="filter"></div>
            <div className="content-center">
                <div className="container">
                    <h1 className="presentation-title animate__animated animate__bounceInUp">Travel</h1>
                    {user === null &&
                        <Nav.Link
                            className="z-5 text-white text-center vacations cursor animate__animated animate__bounceInDown"
                            onClick={() => { navigate("/login") }}
                        >
                            To see all vacations Login Now!
                        </Nav.Link>}
                    <div className="title-brand">
                        <div className="fog-low">
                            <img
                                src="http://demos.creative-tim.com/paper-kit-2/assets/img/fog-low.png"
                                alt=""
                            />
                        </div>
                        <div className="fog-low right">
                            <img
                                src="http://demos.creative-tim.com/paper-kit-2/assets/img/fog-low.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="moving-clouds"></div>
        </div>
    </div>
);
}

export default Home;
