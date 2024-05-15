export default async (db, record_id)=>{
    try {
        const sql = "SELECT pr.*, p.firstname, p.lastname, p.middlename, p.suffix, p.birthdate, p.sex, p.email, p.phone, p.street, p.province, p.city, p.barangay, p.zip from patient_record pr JOIN patient p ON pr.patient_id = p.patient_id WHERE pr.id=$1"
        const result = await db.query(sql, [record_id])

        return result.rows[0];
    } catch (error) {
        console.error("fetchPatientEditRecord ERROR: " + error.message);
    }
}