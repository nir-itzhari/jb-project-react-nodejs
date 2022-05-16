import { Button, ButtonGroup, TextField, Tooltip } from "@material-ui/core";
import { ContactMail, Send } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import ContactUsModel from "../../../Models/ContactUsModel";
import "./ContactUs.css";
import notify from '../../../Services/NotifyService';
import contactServices from '../../../Services/ContactServices';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import validateUserForm from "../../../Utils/validateUserFrom";
import config from "../../../Utils/Config";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";


function ContactUs(): JSX.Element {

    const [click, setClick] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ContactUsModel>({ resolver: yupResolver(validateUserForm.validateContactUsSchema), mode: "onChange" });
    const navigate = useNavigate()

    const submit = async (contactForm: ContactUsModel) => {
        try {
            setClick(!click);
            await contactServices.sendMail(contactForm);
            notify.success("Your message has been sent");
            navigate("/home");
        } catch (error) {
            notify.error(error);
        }
    }

    useEffect(() => {
        window.document.title = "Travel | Contact us";
    }, [])


    return (

        <div className="ContactUs">

            <img src={config.vacationsImageUrl + "ContactUsBackground.jpg"} />

            <form onSubmit={handleSubmit(submit)} className="animate__animated animate__fadeInRight">
                <ContactMail className="svg" />

                <div className="h4-text">Contact Us</div>


                <TextField label="Name" error={errors.name?.message ? true : false} className="TextBox" autoComplete="off" {...register('name')} />
                <span className="ErrorMessage">{errors.name?.message}</span>

                <TextField label="Email" error={errors.email?.message ? true : false} type="email" className="TextBox" autoComplete="off" {...register('email')} />
                <span className="ErrorMessage">{errors.email?.message}</span>

                <TextField label="Subject" error={errors.subject?.message ? true : false} className="TextBox" autoComplete="off" {...register('subject')} />
                <span className="ErrorMessage">{errors.subject?.message}</span>

                <TextField label="Message" error={errors.message?.message ? true : false} className="TextBox" autoComplete="off" {...register('message')} />
                <span className="ErrorMessage">{errors.message?.message}</span>

                {!isValid ?

                    <Button style={{ height: "30px" }} color="primary" type="submit" variant="contained" disabled>Send</Button>
                    :
                    <Button style={{ height: "30px" }} color="primary" type="submit" variant="contained" disabled={click}>{click ? <Spinner animation="border" /> : "Send"}</Button>
                }
            </form>
        </div>
    );
}

export default ContactUs;
