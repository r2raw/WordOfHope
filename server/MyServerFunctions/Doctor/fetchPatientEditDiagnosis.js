export default async (db, record_id)=>{
    try {
        const sql = 'SELECT diagnosis from diagnosis_record WHERE record_id=$1'
        const result = await db.query(sql, [record_id]);

        let diagnosis =[];
        for(let i= 0; i < result.rows.length; i++){
            diagnosis.push(result.rows[i].diagnosis)
        }
        return diagnosis;
    } catch (error) {
        console.error('fetchPatientDiagnosis error: ' + error.message);
    }
}