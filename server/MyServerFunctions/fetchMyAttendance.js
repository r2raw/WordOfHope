export default async (db, empid)=>{
    try {
        const sql = "SELECT id, empid, arrival, departure FROM attendance WHERE empid=$1"
        const result = await db.query(sql, [empid]);

        return result.rows;
    } catch (error) {
        console.error("fetchMyAttendance ERROR: " + error.message)
    }
}