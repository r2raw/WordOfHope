import _ from "lodash";
import { titleCase } from "title-case";
export default async (db, uid, data) => {
  try {
    const sql =
      "INSERT INTO userEmergencyContact(userid,lastname,firstname, middlename, suffix,relation, phone, email) VALUES($1, $2,$3,$4,$5,$6,$7,$8)";
    const result = await db.query(sql, [
      uid,
      titleCase(_.toLower(_.trim(data.lastname))),
      titleCase(_.toLower(_.trim(data.firstname))),
      titleCase(_.toLower(_.trim(data.middlename))),
      data.suffix,
      data.relation,
      data.phone,
      _.trim(data.email),
    ]);

    if(result.rowCount > 0){
        return true;
    }

    return false;
  } catch (error) {
    console.error("insertEmergencyError: " + error.message);
  }
};
