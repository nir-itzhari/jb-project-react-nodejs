import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import ContactUsModel from "../03-models/contact-us-model";
import { OkPacket } from "mysql";

const sendEmail = async (contactUs: ContactUsModel): Promise<any> => {

    const errors = contactUs.validatePost()
    if (errors) throw new ErrorModel(400, errors)
    const sql = `INSERT INTO messages VALUES (DEFAULT, ?, ?, ?, ?)`;

    const info: OkPacket = await dal.execute(sql, [contactUs.name, contactUs.email, contactUs.subject, contactUs.message]);
    contactUs.id = info.insertId;



    dal.mailSend(contactUs)
    return contactUs;
}

export default {
    sendEmail
}