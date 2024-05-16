import _ from "lodash";
import { titleCase } from "title-case";
export default async (db, data) => {
  try {
    const sql =
      "UPDATE patient SET firstname=$1, lastname=$2, middlename=$3, suffix=$4, sex=$5, birthdate=$6, email=$7, phone=$8, street=$9, city=$10, province=$11, barangay=$12, zip=$13 WHERE patient_id=$14";
    const result = await db.query(sql, [
      titleCase(_.toLower(_.trim(data.firstname))),
      titleCase(_.toLower(_.trim(data.lastname))),
      titleCase(_.toLower(_.trim(data.middlename))),
      data.suffix,
      data.sex,
      data.birthdate,
      _.trim(data.email),
      data.phone,
      data.street,
      data.city,
      data.province,
      data.barangay,
      data.zip,
      data.patient_id,
    ]);
    if (result.rowCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("editDoctorPatientInfo ERROR: " + error.message);
  }
};
