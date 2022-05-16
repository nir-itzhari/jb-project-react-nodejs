import Joi from 'joi'
import { joiPassword } from "joi-password"

class CredentialsModel {

    public username: string
    public password: string

    public constructor(user: CredentialsModel) {
        this.username = user.username
        this.password = user.password
    }

    public static schemaLogging = Joi.object({
        username: Joi.string().alphanum().min(6).max(30).required(),
        password: joiPassword
            .string()
            .min(8)
            .max(15)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
    })
    public validateLogging(): string {

        const result = CredentialsModel.schemaLogging.validate(this, { abortEarly: false })

        return result.error?.message
    }
}

export default CredentialsModel