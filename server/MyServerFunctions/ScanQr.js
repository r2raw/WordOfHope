export default async (db, qr) =>{
    const appointedFor = await db.query("SELECT appointedFor from appointmentSched WHERE qrcode=$1", [
        qr
    ])

    if(appointedFor.rowCount === 0) return null;

    return appointedFor.rows[0].appointedfor;
}