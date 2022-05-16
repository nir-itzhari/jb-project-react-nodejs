import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import CredentialsModel from "../03-models/login-model";
import RoleModel from "../03-models/role-model";
import UserModel from "../03-models/user-model";
import cyber from "../01-utils/cyber";
import { v4 as uuid } from "uuid"




const register = async (user: UserModel): Promise<string> => {
    const error = user.validateRegister()
    if (error) {
        throw new ErrorModel(401, error)
    }

    const ifUserTaken = await isUsernameTaken(user.username)
    if (ifUserTaken) throw new ErrorModel(400, 'username already taken')

    user.password = cyber.hash(user.password)
    
    user.role = RoleModel.User
    user.user_id = uuid()

    const sql = "INSERT INTO users VALUES (? ,?, ?, ?, ?, ?)"
    await dal.execute(sql, [user.user_id, user.firstName, user.lastName, user.username, user.password, user.role])

    delete user.password;

    const token = cyber.getNewToken(user)

    return token
}


const isUsernameTaken = async (username: string): Promise<boolean> => {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE Username = ?`;
    const table = await dal.execute(sql, [username]);
    const row = table[0];
    const count = row.count;
    return count > 0;
}



const login = async (credentials: CredentialsModel): Promise<string> => {

    const error = credentials.validateLogging()
    if (error) {
        throw new ErrorModel(401, error)
    }
    credentials.password = cyber.hash(credentials.password)

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const users = await dal.execute(sql, [credentials.username, credentials.password])

    if (users.length <= 0) throw new ErrorModel(401, "incorrect username or password")

    const user = users[0]
    delete user.password;

    const token = cyber.getNewToken(user)
    return token
}

export default {
    register,
    login
}