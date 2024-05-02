export default async(db, rfid) =>{
    try {
        const sql = "SELECT COUNT(*) FROM employee WHERE rfid=$1"
        const result = await db.query(sql, [rfid])
        return result.rows[0].count;
    } catch (error) {
        console.error("CHECK rfid ERROR: " + error.message)
    }
}