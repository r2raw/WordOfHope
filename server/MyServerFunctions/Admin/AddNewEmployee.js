
export default async (db, username,password, data, user, image)=>{
    try {
    const {firstname, lastname, middlename, suffix, sex, birthdate, email, phone, province, city, barangay, street, zip, position, department, empType, rfid} = data;

    const selectPositionName = "SELECT position_name from positions where id=$1"

    const positionName = await db.query(selectPositionName,[position])

    const sql = "INSERT INTO wohUser(username, password, userType, email, accountStatus, firstTimeLog) VALUES ($1,$2,$3,$4,$5,$6)"
    const sql1 = "INSERT INTO employee(id, firstname, lastname, middlename, suffix, sex, birthdate, phone, province, city, barangay, street, zip, position, department, empType, rfid, userId, createdBy, empImg) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13,$14,$15,$16,$17,$18,$19,$20)"
    const insertUser = await db.query(sql, [username, password, positionName.rows[0].position_name, email, "Activated", true]);

    if(insertUser.rowCount > 0){
        const userIdResult = await db.query(
            "SELECT id FROM wohUser WHERE username=$1",
            [username]
          );
        const userId = userIdResult.rows[0].id;
      
        const insertEmployee = await db.query(sql1, [username, firstname, lastname, middlename,suffix, sex, birthdate, phone, province, city,barangay, street, zip, position, department, empType, rfid, userId, user, image])

        if(insertEmployee.rowCount > 0) return "success"
    }
    return null;
    } catch (error) {
        console.error("ADD NEW EMPLOYEE ERROR: " + error.message)
    }
}


    const addNewEmployeeNoImg = async (db, username,password, data, user)=>{
    try {
    const {firstname, lastname, middlename, suffix, sex, birthdate, email, phone, province, city, barangay, street, zip, position, department, empType, rfid} = data;

    console.log(data)
    const selectPositionName = "SELECT position_name from positions where id=$1"

    const positionName = await db.query(selectPositionName,[position])

    
    console.log(positionName.rows)
    const sql = "INSERT INTO wohUser(username, password, userType, email, accountStatus, firstTimeLog) VALUES ($1,$2,$3,$4,$5,$6)"
    const sql1 = "INSERT INTO employee(id, firstname, lastname, middlename, suffix, sex, birthdate, phone, province, city, barangay, street, zip, position, department, empType, rfid, userId, createdBy) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11, $12,$13,$14,$15,$16,$17,$18,$19)"
    const insertUser = await db.query(sql, [username, password, positionName.rows[0].position_name, email, "Activated", true]);

    if(insertUser.rowCount > 0){
        const userIdResult = await db.query(
            "SELECT id FROM wohUser WHERE username=$1",
            [username]
          );
        const userId = userIdResult.rows[0].id;
      
        const insertEmployee = await db.query(sql1, [username, firstname, lastname, middlename,suffix, sex, birthdate, phone, province, city,barangay, street, zip, position, department, empType, rfid, userId, user])

        if(insertEmployee.rowCount > 0) return "success"
    }
    return null;
    } catch (error) {
        console.error("ADD NEW EMPLOYEE ERROR: " + error.message)
    }
}

export {addNewEmployeeNoImg};