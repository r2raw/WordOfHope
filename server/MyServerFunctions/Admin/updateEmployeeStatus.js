export default async (db, status, id) =>{
    try {
        const sql = "UPDATE wohUser set accountstatus=$1 WHERE id=$2"
        const result = await db.query(sql, [status, id])

        if(result.rowCount > 0){
            return true;
        }

        return false;
    } catch (error) {
        console.error("updateEmployeeStatus error: "+ error.message)
    }
}