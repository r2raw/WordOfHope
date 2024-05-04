import _ from "lodash";
import { titleCase } from "title-case";
export default async (db, data) => {
  try {
    const sql =
      "INSERT INTO services(department_id, service_type, service_name, available_online, availability) VALUES ($1,$2,$3,$4, 'Available')";
    const result = await db.query(sql, [
      data.department_id,
      data.service_type,
      titleCase(_.trim(_.toLower(data.service_name))),
      data.available_online,
    ]);

    if(result.rowCount > 0){
        return true
    }

    return false
  } catch (error) {
    console.error("Add Service Error: " + error.message);
  }
};
