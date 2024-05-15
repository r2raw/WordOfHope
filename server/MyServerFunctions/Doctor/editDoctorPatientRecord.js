export default async(db, record_id, data)=>{
    try {
        const sql = "UPDATE patient_record SET service_id=$1, doctor_comment=$2, date_visit=$3 WHERE id=$4"
        const result = await db.query(sql, [data.service, data.comment, data.date_of_visit, record_id]);;
        if(result.rowCount > 0){
            return true
        }
        return false
    } catch (error) {
        console.error("editDoctorPatientRecord ERROR: " + error.message)
    }
}