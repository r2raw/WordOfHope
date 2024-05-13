export default async (db, id)=>{
    try {
        const sql = 'SELECT tpa.*,aps.method, aps.appointmenttime, aps.appointmentdate, aps.service, s.service_type, s.service_name, s.department_id, d.department_name,aps.appointedfor FROM thirdpartyappointment AS tpa JOIN appointmentSched AS aps ON tpa.id = aps.id JOIN services AS s ON aps.service = s.id JOIN departments AS d on s.department_id = d.id WHERE tpa.id=$1'
        const result = await db.query(sql, [id])

        return result.rows[0]
    } catch (error) {
        console.error("getThirdparty appointment error: " + error.message)
    }
}