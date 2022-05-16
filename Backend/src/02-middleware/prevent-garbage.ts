import { NextFunction, Request, Response } from "express";

function preventGarbage(request: Request, response: Response, next: NextFunction) {

    for (const prop in request.body) {
        if (typeof request.body[prop] === "string" && request.body[prop].length > 10000) {
          
            next({ status: 400, message: "Data is too long..." })
            return;
        }
    }

    next();
}

export default preventGarbage

