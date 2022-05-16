import { io, Socket } from "socket.io-client"
import FollowersModel from "../Models/FollowersModel";
import VacationModel from "../Models/VacationModel"
import config from "../Utils/Config"


class SocketService {
    private socket: Socket = io(config.socketUrl);

    public getCreatedVacation(getAddedVacation: Function): void {
        this.socket.on("SOCKET/VACATIONS/CREATED", (vacationFromServer: VacationModel) => {

            getAddedVacation(vacationFromServer);

        })
    }
    
    public getUpdatedVacation(getUpdatedVacation: Function): void {
        this.socket.on("SOCKET/VACATIONS/UPDATED", (vacationFromServer: VacationModel) => {

            getUpdatedVacation(vacationFromServer);
        })
    }
    public getDeletedVacationId(getVacationIdToDelete: Function): void {
        this.socket.on("SOCKET/VACATIONS/DELETED", (vacationId: string) => {

            getVacationIdToDelete(vacationId);

        })
    }
    
    public setVacationFollower(getFollowedVacation: Function): void {
        this.socket.on("SOCKET/VACATIONS/FOLLOWED", (vacationFromServer: FollowersModel) => {

            getFollowedVacation(vacationFromServer);
        })
    }

    public deleteVacationFollower(getUnFollowedVacation: Function): void {
        this.socket.on("SOCKET/VACATIONS/unFOLLOWED", (vacationFromServer: FollowersModel) => {

            getUnFollowedVacation(vacationFromServer);
        })
    }

    public getChartFollowersData(getChartFollowersData: Function): void {
        this.socket.on("SOCKET/VACATIONS/CHART_REPORTED", (vacationFromServer: FollowersModel) => {

            getChartFollowersData(vacationFromServer);
        })
    }

    public sendNewVacation(vacation: VacationModel) {
        this.socket.emit("SOCKET/VACATIONS/CREATE", vacation);
    }

    public sendUpdatedVacation(vacation: VacationModel) {
        this.socket.emit("SOCKET/VACATIONS/UPDATE", vacation);
    }
   
    public deleteVacation(vacationId: string) {
        this.socket.emit("SOCKET/VACATIONS/DELETE", vacationId);
    }

    public sendFollowerVacation(followedVacations: FollowersModel) {
        this.socket.emit("SOCKET/VACATIONS/FOLLOW", followedVacations);
    }


    public deleteFollowerVacation(followedVacations: FollowersModel) {
        this.socket.emit("SOCKET/VACATIONS/unFOLLOW", followedVacations);
    }

    public sendChartFollowersData(followedVacation: FollowersModel) {
        this.socket.emit("SOCKET/VACATIONS/CHART_REPORT", followedVacation);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}


const socketService = new SocketService;

export default socketService

