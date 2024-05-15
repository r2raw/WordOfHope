export default async (db) => {
    try {
        const sql = "SELECT w.email, w.accountStatus, d.department_name, p.position_name, e.* from employee AS e JOIN positions AS p ON  e.position =p.id JOIN departments AS d ON e.department =  d.id JOIN wohUser AS w ON  e.userid = w.id where w.accountStatus = 'Activated' AND e.id IN (SELECT empid FROM employeeSched) ORDER BY e.id DESC";

        const result = await db.query(sql);

        if (result.rowCount > 0){
            return result.rows
        }

        return []
    } catch (error) {
        console.error("getSchedule error: " + error.message)
    }
}