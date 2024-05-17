export default async (db, id)=>{
    try {
        const sql = "SELECT * FROM userEmergencyContact WHERE userid=$1"
        const result = await db.query(sql, [id])
        return result.rows
    } catch (error) {
        console.error("usermergencyContact: " +  error.message)
    }
}