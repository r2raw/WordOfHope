import _ from 'lodash';
import {titleCase} from 'title-case';
export default async (db, id, department) =>{
    try {
        const sql = 'UPDATE departments set department_name=$1 WHERE id=$2'
        const result = await db.query(sql, [titleCase(_.toLower(_.trim(department))), id])

        if(result.rowCount > 0){
            return true;
        }

        return false
    } catch (error) {
        console.error("Update Department Error: " + error.message)
    }
}