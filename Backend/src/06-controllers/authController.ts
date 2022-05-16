import express, { NextFunction, Request, Response } from "express"
import authLogic from "../05-logic/authLogic"
import CredentialsModel from "../03-models/login-model";
import UserModel from "../03-models/user-model"

const router = express.Router();

router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

