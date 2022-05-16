import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import Loading from "../../SharedArea/Loading/Loading";
import "./Routing.css";

const Home = lazy(() => import("../../HomeArea/Home/Home"));
const Login = lazy(() => import("../../AuthArea/Login/Login"));
const Register = lazy(() => import("../../AuthArea/Register/Register"));
const VacationsList = lazy(() => import("../../VacationsArea/VacationList/VacationsList"));
const AddVacation = lazy(() => import("../../VacationsArea/AddVacation/AddVacation"));
const UpdateVacation = lazy(() => import("../../VacationsArea/UpdateVacation/UpdateVacation"));
const Chart = lazy(() => import("../../VacationsArea/Chart/Chart"));
const ContactUs = lazy(() => import("../../ContactUsArea/ContactUs/ContactUs"));
const PageNotFound = lazy(() => import("../PageNotFound/PageNotFound"));


function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>} />

            <Route path="*" element={
                <Suspense fallback={<Loading />}>
                    <PageNotFound />
                </Suspense>} />

            <Route path="/login" element={
                <Suspense fallback={<Loading />}>
                    <Login />
                </Suspense>} />

            <Route path="/register" element={
                <Suspense fallback={<Loading />}>
                    <Register />
                </Suspense>} />

            <Route path="/logout" element={<Logout />} />

            <Route path="/home" element={
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>} />

            <Route path="/vacations" element={
                <Suspense fallback={<Loading />}>
                    <VacationsList />
                </Suspense>} />

            <Route path="/vacations/new" element={
                <Suspense fallback={<Loading />}>
                    <AddVacation />
                </Suspense>} />


            <Route path="/vacations/edit/:id" element={
                <Suspense fallback={<Loading />}>
                    <UpdateVacation />
                </Suspense>} />
            <Route path="/vacations/reports" element={
                <Suspense fallback={<Loading />}>
                    <Chart />
                </Suspense>} />

            <Route path="/contact-us" element={
                <Suspense fallback={<Loading />}>
                    <ContactUs />
                </Suspense>} />
        </Routes>

    );
}

export default Routing;
