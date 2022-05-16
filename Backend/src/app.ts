
import dotenv from "dotenv"
dotenv.config()

import fileUpload from "express-fileupload";
import express, { NextFunction, Request, Response } from "express";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import vacationsController from "./06-controllers/vacationsController"
import cors from "cors"
import config from './01-utils/config';
import path from "path";
import authController from "./06-controllers/authController";
import aboutController from "./06-controllers/aboutController"
import sanitize from "./02-middleware/sanitize";
import expressRateLimit from "express-rate-limit"
import https from "https"
import fs from "fs"
import socketLogic from "./05-logic/socketLogic";
import followersController from "./06-controllers/followersController";
import imagesController from "./06-controllers/imagesController"


const expressServer = express();

expressServer.use("/api", expressRateLimit({
    windowMs: 1000,
    max: 10,
    message: "something went wrong, please try again" // 429 too many requests
}))

if (config.isDevelopment) {
    expressServer.use(cors());
}

expressServer.use(express.json());
expressServer.use(fileUpload());
expressServer.use(express.static(path.join(__dirname, "07-frontend")));
expressServer.use(sanitize);
expressServer.use("/api/auth", authController);
expressServer.use("/api/vacations", vacationsController);
expressServer.use("/assets", imagesController);
expressServer.use("/api/followers", followersController)
expressServer.use("/api/contact", aboutController);
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    if (config.isDevelopment) {
        next(new ErrorModel(404, "Route not found."));
    } else {
        const indexHtmlFile = path.join(__dirname, "07-frontend", "index.html");
        response.sendFile(indexHtmlFile);
    }
});

expressServer.use(errorsHandler);
export const httpServer = expressServer.listen(process.env.PORT, () => console.log(`listening to port ${process.env.PORT}`))


socketLogic(httpServer)

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, "..", "cert", "64587237_northwind.com.key")),
//     cert: fs.readFileSync(path.join(__dirname, "..", "cert", "64587237_northwind.com.cert"))
// }, server);
// sslServer.listen(process.env.PORT, () => console.log("Listening... port " + process.env.PORT));

