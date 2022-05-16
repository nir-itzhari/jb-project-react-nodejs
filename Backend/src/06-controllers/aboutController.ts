import express, { NextFunction, Request, Response } from "express"
import ContactUsModel from "../03-models/contact-us-model"
import aboutLogic from "../05-logic/aboutLogic"


const router = express()

router.post("/email", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const email = new ContactUsModel(request.body) 
        await aboutLogic.sendEmail(email)
        response.json("Success")
    } catch (err) {
        next(err)
    }
})


export default router;