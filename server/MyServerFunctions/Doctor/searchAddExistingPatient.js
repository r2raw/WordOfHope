export default async (db, id)=>{
    try {
        const sql = "SELECT * FROM patient WHERE patient_id=$1"
        const result = await db.query(sql, [id])
        return result.rows
    } catch (error) {
        console.error("searchAddExistingPatient ERROR: " + error.message)
    }
}