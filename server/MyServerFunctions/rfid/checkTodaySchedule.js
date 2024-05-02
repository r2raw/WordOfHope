export default async (db, empid, day)=>{
    try {
        const sql = "SELECT * from employeeSched WHERE empid=$1 AND day=$2"
        const result = await db.query(sql,[empid, day])

        // console.log(result)
        if (result.rowCount > 0){
            console.log("asd")
            return true
        }
        return false;
    } catch (error) {
        console.error("CHECK TODAY SCHEDULE: " + error.message)
    }
}