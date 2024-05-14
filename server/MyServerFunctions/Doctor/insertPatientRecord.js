export default async (db,record_id, patient_id, doctor_id, data)=>{
    try {
        const {service, comment, date_of_visit} = data;
        const sql = "INSERT INTO patient_record(id, patient_id, service_id, doctor_id, doctor_comment, date_visit) VALUES($1,$2,$3,$4,$5,$6)"

        const result = await db.query(sql, [record_id, patient_id, service, doctor_id, comment, date_of_visit])

        if(result.rowCount > 0){
            return true
        }

        return false
        
    } catch (error) {
        console.error("insertPatientError: " + error.message)
    }
}