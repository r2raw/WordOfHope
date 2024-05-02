export default async (db, empid)=>{
    try {
        const sql = "SELECT * from employeeSched WHERE empid=$1"
        const result = await db.query(sql, [empid])

        if(result.rowCount > 0){
            return true
        }
        return false
    } catch (error) {
        console.error("CHECK existing emplyee error: " + error)
    }

}