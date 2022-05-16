import express, { NextFunction, Request, Response } from "express"
import vacationsLogic from "../05-logic/vacationLogic"
import VacationModel from '../03-models/vacation-model';
import verifyLoggedIn from '../02-middleware/verify-logging';
import verifyAdmin from '../02-middleware/verify-admin';
import cyber from "../01-utils/cyber";

const router = express.Router()


router.get('/', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    try {
        const authorizationHeader = request.header("authorization")

        const user = cyber.getUserFromToken(authorizationHeader)
        const vacations = await vacationsLogic.getAllVacations(user.user_id)

        response.json(vacations)

    } catch (error: any) {
        next(error)
    }
})

router.get('/:vacationId', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {

        const id = request.params.id
        const vacation = await vacationsLogic.getOneVacation(id)
        response.json(vacation)


    } catch (error: any) {
        next(error)
    }
})

router.post('/', verifyAdmin, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        request.body.image = request.files?.image
        const vacation = new VacationModel(request.body)

        const addedVacation = await vacationsLogic.addOneVacation(vacation)


        response.status(201).json(addedVacation)

    } catch (error: any) {
        next(error)
    }
})

router.put('/:vacationId', verifyAdmin, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const id = request.params.vacationId
        request.body.vacationId = id
        request.body.image = request.files?.image
        const vacation = new VacationModel(request.body)
        const updatedVacation = await vacationsLogic.updateVacation(vacation)
        response.json(updatedVacation)

    } catch (error: any) {
        next(error)
    }
})


router.delete('/:vacationId', verifyAdmin, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {

        const id = request.params.vacationId
        await vacationsLogic.deleteVacation(id)
        response.sendStatus(204)

    } catch (error: any) {
        next(error)
    }
})


export default router