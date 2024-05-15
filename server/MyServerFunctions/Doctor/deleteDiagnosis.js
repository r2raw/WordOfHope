export default async(db, record_id)=>{
    try {
        const sql = "DELETE FROM diagnosis_record WHERE record_id=$1"
        const result = await db.query(sql, [record_id]);

        if(result.rowCount > 0){
            return true;
        }
        return false;
    } catch (error) {
        console.error("deleteDiagnosis ERROR: " + error.message)
    }
}