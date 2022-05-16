import axios from "axios"
import { fetchFollowedVacations, followVacationAction, unFollowVacationAction } from "../Redux/FollowersState";
import config from "../Utils/Config"
import FollowersModel from './../Models/FollowersModel';
import store from './../Redux/Store';
import { string } from 'yup';
import socketService from "./SocketService";



class FollowersServices {

    public async getFollowedVacations(): Promise<any[]> {

        if (store.getState().followersState.followedVacations.length === 0) {
            const response = await axios.get<FollowersModel[]>(config.followersUrl);
            const followedVacations = response.data;
    
            if (followedVacations.length > 0) {
                store.dispatch(fetchFollowedVacations(followedVacations));
            }
        }
        return store.getState().followersState.followedVacations;
    }

    public async follow(followedVacation: FollowersModel): Promise<void> {
        await axios.post(config.followersUrl + followedVacation.vacationId);
        socketService.sendFollowerVacation(followedVacation);
        
    }

    public async unFollow(followedVacation: FollowersModel): Promise<void> {
        await axios.delete(config.followersUrl + followedVacation.vacationId);
        socketService.deleteFollowerVacation(followedVacation);
    }
}

const followersServices = new FollowersServices();

export default followersServices