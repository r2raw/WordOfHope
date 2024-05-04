export default async (db, department) =>{
    try {
        const sql = "SELECT COUNT(*) from departments WHERE LOWER(department_name)=LOWER($1)"

        const result = await db.query(sql, [department])
        
        return result.rows[0].count
    } catch (error) {
        console.error('CheckExisitingDepartment Error: ' + error.message)
    }
}