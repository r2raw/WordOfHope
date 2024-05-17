export default async (db, id)=>{
    try {
       const sql = "SELECT a.*, s.service_name FROM appointmentSched a JOIN services AS s ON a.service = s.id WHERE DATE(a.appointmentDate) = CURRENT_DATE AND s.department_id=$1 ORDER BY a.appointmentTime ASC"
       const result = await db.query(sql, [id]);
       
       return result.rows;
    } catch (error) {
        console.log("appointment today error: " + error.message)
    }
}