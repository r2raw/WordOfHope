import dayjs from "dayjs";
export default async (db, eid, status, img) =>{
    try {
        const today = dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        const sql = "INSERT INTO attendance(empid, arrival, status, arrivalImg) VALUES($1, $2, $3, $4)"
        const result = await db.query(sql, [eid, today, status, img])

        if(result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error("INSERT TIME IN ERROR: " + error.message)
    }

}