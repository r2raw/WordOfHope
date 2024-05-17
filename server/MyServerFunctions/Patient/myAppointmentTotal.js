export default async(db, uid)=>{
    try {
       const sql = "SELECT COUNT(*) FROM userappointment WHERE userid=$1" 
       const result = await db.query(sql, [uid])
       return result.rows[0].count;
    } catch (error) {
        console.error("myAppointmentTotal error: " + error.message)
    }
}