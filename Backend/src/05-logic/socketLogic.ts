import { Server as httpServer } from "http"
import { Server as SocketIoServer, Socket } from "socket.io"
import FollowersModel from "../03-models/followed-vacation-model"
import VacationModel from "../03-models/vacation-model"
let clients: number = 0
const socketLogic = (httpServer: httpServer) => {
    const socketIoServer = new SocketIoServer(httpServer, { cors: { origin: "http://localhost:3000" } })
    socketIoServer.sockets.on("connection", (socket: Socket) => {

        clients++
        console.log(socket.id + " has been connected.", "Clients: " + clients)
        
        socket.on("SOCKET/VACATIONS/CREATE", (vacation: VacationModel) => {
            console.log(vacation, "Added Vacation")

            socket.broadcast.emit("SOCKET/VACATIONS/CREATED", vacation)
        })

        socket.on("SOCKET/VACATIONS/UPDATE", (vacation: VacationModel) => {
            console.log(vacation, "Updated Vacation")

            socket.broadcast.emit("SOCKET/VACATIONS/UPDATED", vacation)
        })

        socket.on("SOCKET/VACATIONS/DELETE", (vacationId: string) => {
            console.log(vacationId, "Deleted Vacation")


            socket.broadcast.emit("SOCKET/VACATIONS/DELETED", vacationId)
        })

        socket.on("SOCKET/VACATIONS/FOLLOW", (followedVacation: FollowersModel) => {
            console.log("Vacation Followed")


            socket.broadcast.emit("SOCKET/VACATIONS/FOLLOWED", followedVacation)
        })

        socket.on("SOCKET/VACATIONS/unFOLLOW", (followedVacation: FollowersModel) => {
            console.log("Vacation unFollowed")

            socket.broadcast.emit("SOCKET/VACATIONS/unFOLLOWED", followedVacation)
        })


        socket.on("SOCKET/VACATIONS/CHART_REPORT", (followedVacation: FollowersModel) => {
            console.log("Chart Data Reported")


            socket.broadcast.emit("SOCKET/VACATIONS/CHART_REPORTED", followedVacation)
        })


        socket.on("disconnect", () => {
            clients--
            console.log("Client has been disconnected", "Clients: " + clients)
            socket.removeAllListeners()
        })
    })
}

export default socketLogic

