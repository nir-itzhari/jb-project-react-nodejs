import { NextFunction, Request, Response } from "express";


const sanitize = (request: Request, response: Response, next: NextFunction): void => {
    for (const prop in request.body) {


        if (typeof request.body[prop] === "string") {
            request.body[prop] = request.body[prop].toString()
            request.body[prop].replace(/(<([^>]+)>)/ig, '');

        }
    }
    next()
}

export default sanitize