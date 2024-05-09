export default async (db, id, queue_id, doctors_id)=>{
    try {
        const sql = "UPDATE appointmentSched set status='Ongoing' WHERE id=$1";
        const result = await db.query(sql, [id]);

        if(result.rowCount > 0 ){
            const sql2 = "UPDATE queue set doctors_id=$1 WHERE id=$2";

            const result2 = await db.query(sql2, [doctors_id, queue_id])
            if(result2.rowCount > 0){
                return true
            }
        }

        return false

        
    } catch (error) {
        console.error("updateFetchQueue error: " + error.message)
    }
}