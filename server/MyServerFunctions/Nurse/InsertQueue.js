export default async (db, id, queue_no)=>{
    try {
        const sql ="INSERT INTO queue(queue_no, appointment_id) VALUES($1, $2)"

        const result = await db.query(sql, [queue_no, id])
        if(result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error("INSERT QUEUE ERROR: " + error.message)
    }
}