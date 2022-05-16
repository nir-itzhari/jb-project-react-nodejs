import { followVacationAction, unFollowVacationAction } from "../../../Redux/FollowersState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import VacationModel from "../../../Models/VacationModel";
import notify from './../../../Services/NotifyService';
import store from './../../../Redux/Store';
import chartLogic from "../../../Utils/ChartLogic";
import followersServices from "../../../Services/FollowersServices";
import FollowersModel from "../../../Models/FollowersModel";
import socketService from "../../../Services/SocketService";
import authService from "../../../Services/AuthServices";
import AnimatedPage from './../../SharedArea/AnimatedPage/AnimatedPage';
import "./Chart.css";




function Chart(): JSX.Element {
    const [chartVacationLocation, setChartVacationLocation] = useState<string[]>([]);
    const [chartAmountOfFollowers, setChartAmountOfFollowers] = useState<number[]>([]);
    const navigate = useNavigate();



    const chartReport = (vacations: VacationModel[]) => {
        const followReports = chartLogic.getChartParams(vacations);
        setChartVacationLocation(followReports.chartVacationLocation);
        setChartAmountOfFollowers(followReports.chartAmountOfFollowers);
    }
    
    const options = {
        scales: {

        },
    };

    const state = {
        labels: chartVacationLocation,
        datasets: [
            {
                label: 'Followers       ',
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 163, 235, 0.575)",
                    "rgba(255, 207, 86, 0.575)",
                    "rgba(75, 192, 192, 0.575)",
                    "rgba(153, 102, 255, 0.575)",
                    "rgba(255, 159, 64, 0.575)",
                    "rgba(145, 207, 0, 0.2)",
                    "rgba(15, 77, 117, 0.575)",
                    "rgba(206, 5, 5, 0.575)",
                    "rgba(0, 109, 109, 0.575)",
                    "rgba(28, 0, 83, 0.575)",
                    "rgba(7, 218, 0, 0.575)",
                    "rgba(4, 0, 255, 0.575)",
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: chartAmountOfFollowers
            }
        ]
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

        window.document.title = "Travel | Reports";

        followersServices.getFollowedVacations()
            .then(FollowedVacations => {

                chartReport(FollowedVacations)
            })
            .catch(err => notify.error(err));

        const unSubscribeMe = store.subscribe(() => {
            followersServices.getFollowedVacations()
                .then(FollowedVacations => {
                    chartReport([...FollowedVacations])
                })
                .catch(err => notify.error(err))
        });




        return () => unSubscribeMe();

    }, [])

    useEffect(() => {

        socketService.setVacationFollower((followedVacation: FollowersModel) => {
            store.dispatch(followVacationAction(followedVacation));
        });

        socketService.deleteVacationFollower((followedVacation: FollowersModel) => {
            store.dispatch(unFollowVacationAction(followedVacation));
        })
    }, []);

    return (
        <div className="Chart">
            <p> Vacations Followers Report</p>
            <AnimatedPage>
                <div className="ChartContainer">

                    <Bar
                        data={state}
                        options={options}
                    />
                </div>
            </AnimatedPage>
        </div>
    );

}
export default Chart;
