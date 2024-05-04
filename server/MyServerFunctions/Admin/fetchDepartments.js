export default async (db)=>{
    try {
        const sql = 'SELECT *  from departments ORDER by id'
        const result = await db.query(sql)

        return result.rows;
    } catch (error) {
        console.error('Fetch Departments error: ' + error.message)
    }
}