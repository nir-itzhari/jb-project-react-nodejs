import Joi from "joi"
import { UploadedFile } from 'express-fileupload';

class VacationModel {
    public vacationId: string
    public destination: string
    public description: string
    public imageName: string
    public fromDate: string
    public toDate: string
    public price: number
    public isFollowed?: boolean
    public amountOfFollowers?: number
    public image?: UploadedFile

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId
        this.destination = vacation.destination
        this.description = vacation.description
        this.imageName = vacation.imageName
        this.fromDate = vacation.fromDate
        this.toDate = vacation.toDate
        this.price = vacation.price
        this.image = vacation.image
        this.isFollowed = vacation.isFollowed
        this.amountOfFollowers = vacation.amountOfFollowers

    }

    private static postSchema = Joi.object({
        vacationId: Joi.forbidden(),
        destination: Joi.string().required().trim(),
        description: Joi.string().required().min(2).max(10000).trim(),
        fromDate: Joi.date().required(),
        toDate: Joi.date().iso().min(Joi.ref("fromDate")).required(),
        price: Joi.number().required().min(0).max(10000).integer(),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        isFollowed: Joi.allow().optional(),
        amountOfFollowers: Joi.allow().optional()
    })

    private static putSchema = Joi.object({
        vacationId: Joi.string().required().min(36).max(36),
        destination: Joi.string().required().trim(),
        description: Joi.string().required().min(2).max(10000).trim(),
        fromDate: Joi.string().required(),
        toDate: Joi.string().required(),
        price: Joi.number().required().min(0).max(10000).integer(),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        isFollowed: Joi.allow().optional(),
        amountOfFollowers: Joi.allow().optional()
    })

    private static patchSchema = Joi.object({
        vacationId: Joi.string().required().min(36).max(36),
        destination: Joi.string().required().trim(),
        description: Joi.string().required().min(2).max(10000).trim(),
        fromDate: Joi.string().required(),
        toDate: Joi.string().required(),
        price: Joi.number().optional().min(0).max(10000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        isFollowed: Joi.allow().optional(),
        amountOfFollowers: Joi.allow().optional()
    })

    public validatePost(): string {
        const result = VacationModel.postSchema.validate(this, { abortEarly: false })
        return result.error?.message
    }

    public validatePut(): string {
        const result = VacationModel.putSchema.validate(this, { abortEarly: false })
        return result.error?.message
    }

    public validatePatch(): string {
        const result = VacationModel.patchSchema.validate(this, { abortEarly: false })
        return result.error?.message
    }
}


export default VacationModel