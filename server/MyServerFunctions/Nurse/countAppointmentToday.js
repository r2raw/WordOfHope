export default async (db)=>{
    try {
        const sql = "SELECT COUNT(*) AS appointmentCount FROM appointmentSched WHERE appointmentDate = CURRENT_DATE"

        const result = await db.query(sql);
        return result.rows[0]
    } catch (error) {
        console.error("countAppointmentToday ERROR: " + error.message)
    }
}