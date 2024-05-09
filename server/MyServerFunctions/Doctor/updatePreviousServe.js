export default async(db, id) =>{
    try {
        const sql = "UPDATE appointmentSched SET status = 'Completed' WHERE id=$1"

        const result = await db.query(sql, [id])

        if(result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error("Update Previous Serve Error: " + error.message)
    }
}