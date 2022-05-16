import Joi from "joi"

class ContactUsModel {
    public id: number
    public name: string
    public email: string
    public subject: string
    public message: string

    public constructor(contactUs: ContactUsModel) {
        this.id = contactUs.id
        this.name = contactUs.name
        this.email = contactUs.email
        this.subject = contactUs.subject
        this.message = contactUs.message
    }

    private static postSchema = Joi.object({
        id: Joi.forbidden(),
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().required().min(0).max(255),
        subject: Joi.string().required().min(2).max(255),
        message: Joi.string().required().min(2).max(10000)
    })

    public validatePost(): string {
        const result = ContactUsModel.postSchema.validate(this)
        return result.error?.message
    }
}

export default ContactUsModel