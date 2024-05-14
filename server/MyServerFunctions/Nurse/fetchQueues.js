export default async (db) =>{
    try {
        const sql = "SELECT q.*, aps.service, s.service_name, s.department_id, d.department_name  FROM queue AS q JOIN appointmentsched AS aps ON q.appointment_id = aps.id JOIN services AS s on aps.service = s.id JOIN departments AS d ON s.department_id = d.id WHERE aps.status='In Queue' ORDER BY q.date_of_arrival ASC"

        const result = await db.query(sql)

        return result.rows
    } catch (error) {
        console.error("fetch queues error: " + error.message)
    }
}