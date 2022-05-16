import express, { NextFunction, Request, Response } from "express"
import cyber from "../01-utils/cyber"
import followersLogic from "../05-logic/followers-logic"
import verifyLoggedIn from '../02-middleware/verify-logging';
import verifyAdmin from '../02-middleware/verify-admin';

const router = express.Router()

router.get('/', verifyAdmin, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const followedVacations = await followersLogic.getAllVacationsFollowUnFollow()

        response.json(followedVacations)

    } catch (error: any) {
        next(error)
    }
})

router.post('/:vacationId', verifyLoggedIn, async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        const vacationId = request.params.vacationId
        const userId = cyber.getUserFromToken(request.header("authorization")).user_id
        console.log(userId)
        await followersLogic.follow(userId, vacationId)

        response.sendStatus(200)



    } catch (error: any) {
        next(error)
    }
})



router.delete("/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = request.params.vacationId
        const userId = cyber.getUserFromToken(request.header("authorization")).user_id

        await followersLogic.unFollow(userId, vacationId)
        response.sendStatus(200);
    } catch (err) {
        return next(err);
    }
});

export default router