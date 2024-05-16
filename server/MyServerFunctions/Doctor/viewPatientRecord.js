export default async(db, id)=>{
    try {
        const sql = "SELECT pr.id, pr.patient_id, p.firstname, p.lastname, p.middlename, p.suffix, p.street, p.barangay, p.city, p.province, p.zip, p.phone, p.birthdate, p.sex, pr.date_visit, e.firstname AS doc_firstname, e.lastname AS doc_lastname, e.middlename AS doc_middlename, e.suffix AS doc_suffix, s.service_name, s.service_type, d.department_name, pr.doctor_comment FROM patient_record pr JOIN patient p ON pr.patient_id = p.patient_id JOIN employee e ON pr.doctor_id=e.id JOIN services s ON pr.service_id = s.id JOIN departments d ON s.department_id =d.id WHERE pr.id=$1"
        const result = await db.query(sql, [id])

        return result.rows;
    } catch (error) {
        console.error("view patient error: " + error.message)
    }
}