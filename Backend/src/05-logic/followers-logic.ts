import ErrorModel from "../03-models/error-model";
import dal from "../04-dal/dal";
import FollowedModel from './../03-models/followed-vacation-model';

const follow = async (userId: string, vacationId: string): Promise<void> => {

    const ifVacationFollowed = await isVacationFollowed(userId, vacationId)
    
    if (ifVacationFollowed) throw new ErrorModel(400, 'Vacation is already followed by you')

    const sql = `INSERT INTO followers VALUES(?, ?)`;

    await dal.execute(sql, [vacationId, userId]);
}

const unFollow = async (userId: string, vacationId: string): Promise<void> => {
    const sql = `DELETE FROM followers WHERE vacation_id= ? AND user_id= ?`;

    await dal.execute(sql, [vacationId, userId])
}


const getAllVacationsFollowUnFollow = async (): Promise<FollowedModel[]> => {
    const sql = `SELECT V.vacation_id AS vacationId, V.destination AS destination, COUNT(F.user_id) AS amountOfFollowers 
    FROM vacations V 
    JOIN followers F
    ON V.vacation_id = F.vacation_id
    GROUP BY V.destination
    ORDER BY F.user_id DESC`;

    const followingVacations = await dal.execute(sql, []);

    return followingVacations

}

const isVacationFollowed = async (vacationId: string, userId: string): Promise<boolean> => {
    const sql = `SELECT COUNT(*) AS count FROM followers WHERE vacation_id = ? AND user_id = ?`;
    const table = await dal.execute(sql, [vacationId, userId]);
    const row = table[0];
    const count = row.count;
    return count > 0;
}


export default {
    follow,
    unFollow,
    getAllVacationsFollowUnFollow

};
