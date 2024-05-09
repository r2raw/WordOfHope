export default async (db) =>{
    try {
        const sql = "SELECT * FROM services WHERE available_online =true AND availability='Available'"

        const result = await db.query(sql);

        return result.rows;
    } catch (error) {
        console.error("fetchServices Error: " + error.message)
    }
}