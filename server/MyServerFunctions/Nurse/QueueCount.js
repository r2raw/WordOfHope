export default async (db)=>{
    try {
        const sql = "SELECT COUNT(*) FROM queue WHERE DATE(date_of_arrival) = CURRENT_DATE"

        const result = await db.query(sql)

        return parseInt(result.rows[0].count)
    } catch (error) {
        console.error("QUEUE COUNT ERROR: " + error.message)
    }
}