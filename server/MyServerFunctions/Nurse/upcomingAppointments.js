export default async (db)=>{
    try {
       const sql = "SELECT a.*, s.service_name FROM appointmentSched a JOIN services AS s ON a.service = s.id WHERE DATE(a.appointmentDate) > CURRENT_DATE ORDER BY a.appointmentTime ASC"
       const result = await db.query(sql);
       
       return result.rows;
    } catch (error) {
        console.log("appointment today error: " + error.message)
    }
}