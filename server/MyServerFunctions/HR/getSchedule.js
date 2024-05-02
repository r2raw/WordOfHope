export default async (db) => {
    try {
        const sql = "SELECT w.email, w.accountStatus, e.* from employee AS e JOIN wohUser AS w ON  e.userid = w.id where w.accountStatus = 'Activated' AND e.id IN (SELECT empid FROM employeeSched)";

        const result = await db.query(sql);

        if (result.rowCount > 0){
            return result.rows
        }

        return []
    } catch (error) {
        console.error("getSchedule error: " + error.message)
    }
}