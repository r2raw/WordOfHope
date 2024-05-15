export default async (db, id)=>{
    try {
        const sql =  "DELETE FROM employeesched WHERE empid=$1"

        const result = await db.query(sql, [id])

        if(result.rowCount > 0){
            return true
        }
        return false
    } catch (error) {
        console.error("deleteEmplloyeeSched Error: " + error.message)
    }
}