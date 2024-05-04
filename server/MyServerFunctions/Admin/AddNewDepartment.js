import _ from "lodash";
import { titleCase } from "title-case";
export default async (db, department) => {
  try {
    const sql = "INSERT INTO departments(department_name, availability) VALUES($1, 'Available')";
    const result = await db.query(sql, [titleCase(_.toLower(_.trim(department)))]);

    if (result.rowCount > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("ADD new Department error: " + error.message);
  }
};
