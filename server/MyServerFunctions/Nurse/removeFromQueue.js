export default async(db, id, appointment)=>{
    try {
        const sql1 = "DELETE FROM queue WHERE id=$1";

        const sql2 = "UPDATE appointmentsched SET status=$1 WHERE id=$2"
        const deleteRes = await db.query(sql1, [id]);
        if(deleteRes.rowCount > 0){
            const updateRes = await db.query(sql2, ["Upcoming", appointment]);
            if(updateRes.rowCount > 0){
                return true
            }
        }
        return false
    } catch (error) {
        console.error("removeFromQueue ERROR: " + error.message)
    }
}