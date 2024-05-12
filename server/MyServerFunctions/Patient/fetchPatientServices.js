export default async (db) =>{
    try {
        const sql = "SELECT * FROM services WHERE available_online=$1 AND availability=$2"

        const result = await db.query(sql, [true, "Available"]);

        console.log(result.rows)
        return result.rows;
    } catch (error) {
        console.error("fetchServices Error: " + error.message)
    }
}