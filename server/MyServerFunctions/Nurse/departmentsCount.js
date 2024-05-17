export default async (db)=>{
    try {
        const sql = "SELECT COUNT(*) FROM departments WHERE availability='Available'";
        const result = await db.query(sql);

        return result.rows[0].count;
    } catch (error) {
        console.error("department cont error: "  + error.message)
    }
}