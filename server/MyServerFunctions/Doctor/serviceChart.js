export default async (db)=>{
    try {
        const sql = "SELECT DISTINCT(COUNT(s.service_name)), s.service_name FROM appointmentSched AS aps JOIN services AS s ON aps.service = s.id WHERE aps.status ='Completed' GROUP BY s.service_name"

        const result = await db.query(sql)

        return result.rows
    } catch (error) {
        console.error('serviceChart error: ' + error.message)
    }
}