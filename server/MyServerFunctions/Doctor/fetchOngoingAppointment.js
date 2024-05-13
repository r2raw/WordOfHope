export default async (db, id)=>{
    try {
        const sql = "SELECT q.*, aps.service, aps.method, aps.appointedfor, s.service_name, s.department_id, d.department_name  FROM queue AS q JOIN appointmentsched AS aps ON q.appointment_id = aps.id JOIN services AS s on aps.service = s.id JOIN departments AS d ON s.department_id = d.id WHERE aps.status='Ongoing' AND q.doctors_id=$1"
        const result = await db.query(sql, [id])

        return result.rows
    } catch (error) {
        console.error("fetchOngoingAppointment error: " + error.message)
    }
}