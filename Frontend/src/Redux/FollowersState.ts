import FollowersModel from '../Models/FollowersModel';

export class FollowersState {
    public followedVacations: FollowersModel[] = [];

}

export enum FollowersActionType {
    FetchFollowedVacations = "FetchFollowedVacations",
    Follow = "Follow",
    unFollow = "unFollow",
}

export interface FollowersAction {
    type: FollowersActionType;
    payload: any;
}

export const fetchFollowedVacations = (followedVacations: FollowersModel[]): FollowersAction => {
    return { type: FollowersActionType.FetchFollowedVacations, payload: followedVacations };
}
export const followVacationAction = (followedVacations: FollowersModel): FollowersAction => {
    return { type: FollowersActionType.Follow, payload: followedVacations };
}
export const unFollowVacationAction = (followedVacations: FollowersModel): FollowersAction => {
    return { type: FollowersActionType.unFollow, payload: followedVacations };
}

export const followersReducer = (currentState = new FollowersState(), action: FollowersAction): FollowersState => {
    const newState = { ...currentState };

    switch (action.type) {
        case FollowersActionType.FetchFollowedVacations:
            newState.followedVacations = action.payload;
            break;
        case FollowersActionType.Follow:
            const indexToFollow = newState.followedVacations.findIndex(f => f.vacationId === action.payload.vacationId);
            if (indexToFollow >= 0) {
                newState.followedVacations[indexToFollow].amountOfFollowers = action.payload.amountOfFollowers;
            }
            newState.followedVacations.push(action.payload);
            break;
        case FollowersActionType.unFollow:
            const indexToDelete = newState.followedVacations.findIndex(f => f.vacationId === action.payload.vacationId);
            if (indexToDelete >= 0) {
            newState.followedVacations.splice(indexToDelete, 1);
            }
            break;
    }
    return newState;
}