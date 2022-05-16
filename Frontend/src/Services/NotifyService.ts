import { Notyf } from "notyf"
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

class NotifyService {
    public innerWidth = window.innerWidth

    private notification = new Notyf({
        duration: 3000,
        position: { x: this.innerWidth > 500 ? "right" : "center", y: this.innerWidth > 500 ? "center" : "bottom" },
        dismissible: true,
        ripple: false,
        types: [{
            type: "success",
            background: '#00122c'
        }]
    })


    public success(message: string): void {
        this.notification.success(message);

    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err)
        this.notification.error(message);

    }

    private extractErrorMessage(err: any): string {
        if (typeof err === "string") return err;

        if (typeof err.response?.data === "string") return err.response.data;

        if (Array.isArray(err.response?.data)) return err.response.data[0];

        if (typeof err.message === "string") return err.message;

        return "Some error, please try again ";
    }
}

const notify = new NotifyService();

export default notify