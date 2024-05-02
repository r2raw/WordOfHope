export default async (db, uid) =>{

    try {
        const sql = `SELECT e.*, u.email, u.username FROM wohUser as u JOIN employee AS e ON u.id = e.userid WHERE u.id=$1`
        const hrResult = await db.query(sql, [uid])
    
        if (hrResult.rowCount > 0){
            return hrResult.rows;
        }
        return null
        
    } catch (error) {
        console.error("GetHRInfo error: " +  error.message)
    }


} 