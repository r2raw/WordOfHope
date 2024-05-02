export default async (db, id, img) =>{
    try {
        const sql = "UPDATE employee SET empimg=$1 WHERE id=$2"
        const result = await db.query(sql, [img, id]);

        if (result.rowCount > 0){
            return true
        }

        return false
    } catch (error) {
        console.error("update employee image error: " + error.message)
    }
}