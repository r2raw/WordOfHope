export default async (db)=>{
    try {
        const sql = "SELECT employee.*, wohUser.email from employee JOIN wohUser ON employee.userId = wohUser.id ORDER BY employee.id DESC";
        const result = await db.query(sql);

        if(result.rowCount > 0){
            return result.rows
        }

        return [];
    } catch (error) {
        console.error("Get All Employee ERROR: "  + error.message)
    }
}