export default async (db, uid)=>{
    try {
        const sql = "SELECT pr.id, pr.date_visit, s.service_type, s.service_name, e.firstname, e.lastname, e.suffix, e.middlename FROM patient_record pr JOIN services s ON pr.service_id = s.id JOIN employee e ON pr.doctor_id = e.id JOIN patient p ON pr.patient_id=p.patient_id WHERE p.user_id=$1"
        const result = await db.query(sql,[uid])
        return result.rows;
    } catch (error) {
        console.error("fetch my record error: " + error.message)
    }
}