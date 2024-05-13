export default async (db, appointmentId)=>{
    try {
        const sql = "SELECT ua.*, up.firstname, up.lastname, up.middlename, up.suffix, up.email, up.phone, aps.method, aps.appointmenttime, aps.appointmentdate, aps.service, s.service_type, s.service_name, s.department_id, d.department_name, aps.appointedfor FROM userappointment AS ua JOIN userProfile AS up ON ua.userid = up.userid JOIN appointmentSched AS aps ON ua.id = aps.id JOIN services AS s ON aps.service = s.id JOIN departments AS d on s.department_id = d.id WHERE ua.id=$1"
        const result = await db.query(sql, [appointmentId]);

        return result.rows[0]
    } catch (error) {
        console.error("getUserAppointment error: " + error.message)
    }
}