export default async (db, record_id, diagnosis)=>{
    try {
        const sql = 'INSERT INTO diagnosis_record(record_id, diagnosis) VALUES ($1, $2)'

        const result = await db.query(sql, [record_id, diagnosis])

        if(result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error('insertDiagnosisError: ' + error.message)
    }
}