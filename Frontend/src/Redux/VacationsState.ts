import FollowersModel from '../Models/FollowersModel';
import VacationModel from '../Models/VacationModel';

export class VacationsState {
    public vacations: VacationModel[] = [];

}

export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    Follow = "Follow",
    unFollow = "unFollow",
    updateVacationFollowers = "UpdateVacationFollowers"
}

export interface VacationAction {
    type: VacationsActionType;
    payload: any;
}

export const fetchVacationsAction = (vacation: VacationModel[]): VacationAction => {
    return { type: VacationsActionType.FetchVacations, payload: vacation };
}

export const addVacationAction = (vacation: VacationModel): VacationAction => {
    return { type: VacationsActionType.AddVacation, payload: vacation };
}
export const updateVacationAction = (vacation: VacationModel): VacationAction => {
    return { type: VacationsActionType.UpdateVacation, payload: vacation };
}
export const deleteVacationAction = (vacationId: string): VacationAction => {
    return { type: VacationsActionType.DeleteVacation, payload: vacationId };
}

export const followVacationAction = (vacationId: string): VacationAction => {
    return { type: VacationsActionType.Follow, payload: vacationId };
}
export const unFollowVacationAction = (vacationId: string): VacationAction => {
    return { type: VacationsActionType.unFollow, payload: vacationId };
}
export const UpdateVacationFollowersActionType = (followedVacation: FollowersModel): VacationAction => {
    return { type: VacationsActionType.updateVacationFollowers, payload: followedVacation };
}

export const vacationsReducer = (currentState = new VacationsState(), action: VacationAction): VacationsState => {
    const newState = { ...currentState };

    switch (action.type) {
        case VacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;
        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload);
            break;
        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;
        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;
        case VacationsActionType.updateVacationFollowers:
            const indexToUpdateFollow = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdateFollow >= 0) {
                newState.vacations[indexToUpdateFollow].amountOfFollowers = action.payload.amountOfFollowers;
            }
            break;

    }

    return newState;
}