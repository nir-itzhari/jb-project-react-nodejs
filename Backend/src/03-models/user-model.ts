import Joi from 'joi';
import { joiPassword } from 'joi-password';
import RoleModel from "./role-model"

class UserModel {
    public user_id: string
    public firstName: string
    public lastName: string
    public username: string
    public password: string
    public role: RoleModel

    public constructor(user: UserModel) {
        this.user_id = user.user_id
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.username = user.username
        this.password = user.password
        this.role = user.role
    }

    public static schemaRegister = Joi.object({
        user_id: Joi.forbidden(),
        firstName: Joi.string().alphanum().min(2).max(30).required().trim(),
        lastName: Joi.string().alphanum().min(2).max(30).required().trim(),
        username: Joi.string().alphanum().min(6).max(30).required().trim(),
        password: joiPassword
            .string()
            .min(8)
            .max(15)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required().trim(),
        role: Joi.forbidden()
    })

    public validateRegister() {
        const result = UserModel.schemaRegister.validate(this, { abortEarly: false })

        return result.error?.message
    }
}

export default UserModel