export default async (db)=>{
    try {
        const sql = "SELECT COUNT(*) FROM patient";

        const result = await db.query(sql);

        return parseInt(result.rows[0].count)
    } catch (error) {
        console.error("")
    }
}