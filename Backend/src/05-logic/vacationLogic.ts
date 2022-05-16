import { v4 as uuid } from "uuid"
import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import dal from "../04-dal/dal"
import path from "path";
import { unlinkSync } from "fs";
import VacationModel from '../03-models/vacation-model';



const getAllVacations = async (userId: string): Promise<VacationModel[]> => {

    let sql = `SELECT 
  v.vacation_id AS vacationId,
  v.destination,
  v.description,
  v.imageName,
  fromDate,
  toDate,
  v.price,
  CASE
      WHEN followed.vacation_id IS NOT NULL THEN true
      ELSE false
  END AS 'isFollowed',
  CASE
      WHEN fv.followers IS NOT NULL THEN fv.followers
      ELSE 0
  END AS 'amountOfFollowers'
FROM
  vacations v
      LEFT JOIN
  (SELECT 
      vacation_id
  FROM
      followers
  WHERE
      user_id = ?) followed ON v.vacation_id = followed.vacation_id
      LEFT JOIN
  (SELECT 
      vacation_id, COUNT(vacation_id) AS 'followers'
  FROM
      followers
  GROUP BY vacation_id) fv ON v.vacation_id = fv.vacation_id
ORDER BY isFollowed DESC`;


    let vacations = await dal.execute(sql, [userId]);

    for (let i = 0; i < vacations.length; i++) {
        if (vacations[i].isFollowed == 1) {
            vacations[i].isFollowed = true;
        } else {
            vacations[i].isFollowed = false;
        }
    }

    
    return vacations
}

const getOneVacation = async (vacationId: string): Promise<VacationModel> => {
    const sql = `SELECT 
    vacation_id AS vacationId,
    destination,
    description,
    fromDate,
    toDate,
    price,
    imageName
    FROM vacations
    WHERE vacation_id = ?`

    const vacations = await dal.execute(sql, [vacationId])
    const vacation = vacations[0];

    if (!vacation) throw new ErrorModel(404, `id ${vacationId} not found`);

    return vacation;
}

const addOneVacation = async (vacation: VacationModel): Promise<VacationModel> => {

    const errors = vacation.validatePost();

    if (errors) throw new ErrorModel(400, errors);

    if (!vacation.image) throw new ErrorModel(400, "Vacation must have an image");

    vacation.vacationId = uuid()
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
    vacation.imageName = uuid() + extension
    await vacation.image.mv(path.join(__dirname, "..", "assets", "images", vacation.imageName))

    const sql = `INSERT INTO vacations VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await dal.execute(sql, [vacation.vacationId, vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageName]);

    delete vacation.image

    vacation.amountOfFollowers = 0

    return vacation;
}

const updateVacation = async (vacation: VacationModel): Promise<VacationModel> => {

    const errors = vacation.validatePut();

    if (errors) throw new ErrorModel(400, errors);

    if (!vacation.image) throw new ErrorModel(400, "Vacation must have an image")

    const vacationFromDB = await getOneVacation(vacation.vacationId)

    const oldImageName = vacationFromDB.imageName
    const absolutePath = path.join(__dirname, "..", "assets", "images", oldImageName);

    unlinkSync(absolutePath)
    const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
    vacation.imageName = uuid() + extension;

    await vacation.image.mv(path.join(__dirname, "..", "assets", "images", vacation.imageName))


    const sql = `UPDATE Vacations SET
    destination = ?,
    description = ?,
    fromDate = ?,
    toDate = ?,
    price = ?,
    imageName = ?
    WHERE vacation_id = ?`;

    const info: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.fromDate, vacation.toDate, vacation.price, vacation.imageName, vacation.vacationId]);

    if (info.affectedRows === 0) throw new ErrorModel(404, `id ${vacation.vacationId} not found`);

    delete vacation.image

    vacation.amountOfFollowers = 0

    return vacation;
}

const deleteVacation = async (vacationId: string) => {


    const vacation = await getOneVacation(vacationId)

    const absolutePath = path.join(__dirname, "..", "assets", "images", vacation.imageName);

    const sql = `DELETE FROM vacations WHERE vacation_id = ? `
    const info: OkPacket = await dal.execute(sql, [vacationId])
    unlinkSync(absolutePath);

    if (info.affectedRows === 0) throw new ErrorModel(404, `id ${vacationId} not found`)

}



export default {
    getAllVacations,
    getOneVacation,
    addOneVacation,
    updateVacation,
    deleteVacation
}