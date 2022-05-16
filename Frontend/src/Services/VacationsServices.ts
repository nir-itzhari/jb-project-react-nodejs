import { fetchVacationsAction, addVacationAction, deleteVacationAction, updateVacationAction } from '../Redux/VacationsState';
import axios from "axios";
import VacationModel from "../Models/VacationModel";
import store from "../Redux/Store";
import config from "../Utils/Config";
import dayjs from 'dayjs';

class VacationsService {

    public async fetchVacations(): Promise<VacationModel[]> {

        if (store.getState().vacationsState.vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            const vacations = response.data;

            store.dispatch(fetchVacationsAction(vacations));
        }
        return store.getState().vacationsState.vacations;
    }

    public async getOneVacation(vacationId: string): Promise<VacationModel> {
        let vacation = store.getState().vacationsState.vacations.find(v => v.vacationId === vacationId);
        if (!vacation) {
            const response = await axios.get<VacationModel>(config.vacationsUrl + vacationId);
            vacation = response.data;
        }
        return vacation;
    }

    public async addNewVacation(vacation: VacationModel): Promise<VacationModel> {

        const formData = new FormData();
        formData.append('destination', vacation.destination);
        formData.append('description', vacation.description);
        formData.append('fromDate', dayjs(vacation.fromDate).format("YYYY-MM-DD"));
        formData.append('toDate', dayjs(vacation.toDate).format("YYYY-MM-DD"));
        formData.append('price', vacation.price.toString());
        formData.append('image', vacation.image.item(0));

        const response = await axios.post<VacationModel>(config.vacationsUrl, formData);
        const addedVacation = response.data;

        store.dispatch(addVacationAction(addedVacation));

        return addedVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append('destination', vacation.destination);
        formData.append('description', vacation.description);
        formData.append('fromDate', dayjs(vacation.fromDate).format("YYYY-MM-DD"));
        formData.append('toDate', dayjs(vacation.toDate).format("YYYY-MM-DD"));
        formData.append('price', vacation.price.toString());
        formData.append('image', vacation.image.item(0));


        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.vacationId, formData);
        const updatedVacation = response.data;
        store.dispatch(updateVacationAction(updatedVacation));
        return updatedVacation;
    }

    public async deleteOneVacation(vacationId: string): Promise<void> {
        await axios.delete(config.vacationsUrl + vacationId);
        store.dispatch(deleteVacationAction(vacationId));
    }
}
const vacationService = new VacationsService();

export default vacationService
