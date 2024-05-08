export default async (db)=>{
    try {
        const sql = "SELECT employee.*, wohUser.email, positions.position_name, departments.department_name, wohUser.accountstatus from employee JOIN wohUser ON employee.userId = wohUser.id JOIN positions ON employee.position = positions.id JOIN departments ON employee.department = departments.id ORDER BY employee.id DESC";
        const result = await db.query(sql);

        if(result.rowCount > 0){
            return result.rows
        }

        return [];
    } catch (error) {
        console.error("Get All Employee ERROR: "  + error.message)
    }
}