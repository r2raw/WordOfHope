export default async (db, department_id)=>{
    try {
        const sql = "SELECT q.id, q.appointment_id FROM queue AS q JOIN appointmentsched AS aps ON q.appointment_id = aps.id JOIN services AS s on aps.service = s.id JOIN departments AS d ON s.department_id = d.id WHERE aps.status='In Queue' AND department_id=$1 ORDER BY q.date_of_arrival ASC LIMIT 1"
        const result = await db.query(sql, [department_id])

        return result.rows[0]
    } catch (error) {
        console.error("fetch top queue error: " + error.message)
    }
}