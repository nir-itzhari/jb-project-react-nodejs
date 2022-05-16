import mysql from "mysql"
import config from './../01-utils/config';
import nodeMailer from 'nodemailer';
import ContactUsModel from "../03-models/contact-us-model";


const connection = mysql.createPool({
    host: config.mySql.host,
    user: config.mySql.user,
    password: config.mySql.password,
    database: config.mySql.database,
})

const execute = (sql: string, values?: any[]): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, ((err, result) => {
            if (err) return reject(err)
            resolve(result)
        }))
    })
}


const transponder = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    }
})

const mailSend = (contactUs: ContactUsModel): Promise<any> => {
    return new Promise<any>((resolve, reject) => {

        const mailOptions = {
            from: contactUs.email,
            to: process.env.USER_MAIL,
            subject: `${contactUs.email}:  ${contactUs.subject}`,
            html: `
            <div style="direction: ltr">
            <h1>Contact From NW-tst</h1>
            <p><b>Name:</b> ${contactUs.name}</p>
            <p><b>Subject:</b> ${contactUs.subject}<br /></p>
            <p><b>Message:</b><i> ${contactUs.message}</i></p>
            </div>`
        }

        transponder.sendMail(mailOptions, (err, info) => {
            if (err) return reject(err)

            resolve(info.response)
        })

    })

}

export default {
    execute,
    mailSend
}