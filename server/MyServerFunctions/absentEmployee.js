export default async (db)=>{
    try {
        const sql = "SELECT es.* FROM employeeSched es JOIN employee e ON es.empid  = e.id JOIN wohuser u ON e.userid = u.id  LEFT JOIN attendance att ON es.empid = att.empid AND att.arrival::DATE = CURRENT_DATE WHERE es.day = 'Friday'  AND es.starttime < CURRENT_TIME AND att.arrival IS NULL AND u.accountstatus='Activated'"

        const result = await db.query(sql)
        return result.rows;
    } catch (error) {
        console.error("Absent employee error: " + error.message)
    }
}