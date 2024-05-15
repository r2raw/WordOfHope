import _ from "lodash"
import { titleCase } from "title-case"

export default async (db, data, id) =>{
    try {
        const sql = "UPDATE services SET department_id=$1, service_name=$2, service_type=$3, available_online=$4 WHERE id=$5"
        const result = await db.query(sql, [data.department_id, titleCase(_.trim(_.toLower(data.service_name))), data.service_type, data.available_online, id])

        if(result.rowCount > 0){
            return true
        }
        return false
    } catch (error) {
        console.error("Update Services ERROR: " + error.message)
    }
}