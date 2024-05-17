export default async (db) => {
    try {
        const sql = "SELECT COUNT(*) FROM employee e JOIN positions p ON e.position = p.id JOIN wohUser u ON e.userid = u.id WHERE p.position_name='Doctor' AND u.accountstatus='Activated'"

        const result = await db.query(sql);
        return result.rows[0].count;
    } catch (error) {
        console.error("available doctors count: " + error.message)
    }
}