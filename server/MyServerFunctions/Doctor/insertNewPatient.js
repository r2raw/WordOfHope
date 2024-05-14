import _ from 'lodash'
import { titleCase } from 'title-case';
export default async (db, patient_id, data)=>{
    try {
        const {firstname, lastname, middlename, suffix, sex, birthdate, email, phone, street, province, barangay, zip, city, user_id} = data;
        const sql = "INSERT INTO patient(patient_id, firstname, lastname, middlename, suffix, sex, birthdate, email, phone, street, city, province, barangay, zip, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)"

        const result = await db.query(sql, [patient_id, titleCase(_.toLower(_.trim(firstname))), titleCase(_.toLower(_.trim(lastname))), titleCase(_.toLower(_.trim(middlename))), suffix, sex, birthdate, _.trim(email), phone, street, city, province, barangay, zip, user_id]);

        if(result.rowCount > 0){
            return true
        }
        return false
    } catch (error) {
        console.error("insert new patient error: " + error.message)
    }
}