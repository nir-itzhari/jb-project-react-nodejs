import axios from 'axios';
import ContactUsModel from './../Models/ContactUsModel';
import config from './../Utils/Config';


class ContactService {

    public async sendMail(ContactForm: ContactUsModel): Promise<ContactUsModel> {
        const response = await axios.post<ContactUsModel>(config.contactUs, ContactForm);

        return response.data;
    }


}

const contactServices = new ContactService();

export default contactServices