export default async (db, empid)=>{
    try {
        const sql = "SELECT id, firstname, middlename,lastname, suffix from employee WHERE id=$1"
        const result = await db.query(sql, [empid])


        if(result.rowCount > 0){
            return result.rows
        }
        return false;
    } catch (error) {
        console.error("CHECK existing emplyee error: " + error)
    }

}