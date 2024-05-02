export default async (db, data, uid) => {
  try {
    const {
      firstname,
      lastname,
      middlename,
      suffix,
      email,
      phone,
      sex,
      birthdate,
      barangay,
      city,
      province,
      zip,
    } = data;
    const sql1 = "UPDATE employee set firstname=$1, lastname=$2, middlename=$3, suffix=$4, phone=$5, sex=$6, birthdate=$7, barangay=$8, city=$9, province=$10, zip=$11 WHERE userid=$12";
    const sql2 = "UPDATE wohUser set email=$1 WHERE id=$2";

    const updateEmployeeResult = await db.query(sql1, [
      firstname,
      lastname,
      middlename,
      suffix,
      phone,
      sex,
      birthdate,
      barangay,
      city,
      province,
      zip,
      uid,
    ]);

    console.log(suffix)
    const updateWohUserResult = await db.query(sql2, [email, uid]);
    if(updateEmployeeResult.rowCount > 0 && updateWohUserResult.rowCount >  0){
        return "success"
    }

    return "failed"

  } catch (error) {
    console.error("updateemployee error: " + error.message);
  }
};
