import dayjs from 'dayjs'
export default async (db, data, nurse_id,qr_code, appointment_id)=>{
    try {
        const sql1 = "INSERT INTO appointmentsched(id, appointmenttime, appointmentdate, type, reason, service, method, qrcode, appointedfor, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
        const sql2 = "INSERT INTO walkinappointment(id, appointedBy, firstname, lastname, middlename, suffix, sex, birthdate, province, city, barangay, street, zip) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)"

        const result1  = await db.query(sql1, [appointment_id, dayjs(Date.now()).format("HH:mm:ss"), dayjs(Date.now()).format("YYYY-MM-DD"), "Check-up", data.reason, data.service, "Walk-In", qr_code, "Someone", "Upcoming"])

        if(result1.rowCount > 0){
            const result2 = await db.query(sql2, [appointment_id, nurse_id, data.firstname, data.lastname, data.middlename, data.suffix, data.sex, data.birthdate, data.province, data.city, data.barangay, data.street, data.zip])

            if(result2.rowCount > 0){
                return true;
            }
        }
        return false
    } catch (error) {
        console.error("insert walkin error: " + error.message)
    }
}