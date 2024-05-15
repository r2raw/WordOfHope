export default async (db, availability, id)=>{
    try {
        const sql = "UPDATE services set availability=$1 WHERE id=$2"
        const result = await db.query(sql, [availability, id])

        if(result.rowCount > 0){
            return true
        }
        return false
    } catch (error) {
        console.error("update service availability error: " + error.message)
    }
}