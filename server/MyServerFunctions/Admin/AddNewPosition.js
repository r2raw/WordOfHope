export default async (db, dept_id, position) => {
  try {
    const sql =
      "INSERT INTO positions(department_id, position_name, availability) VALUES($1, $2, 'Available')";
    const result = await db.query(sql, [dept_id, position]);

    if (result.rowCount > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("AddNewPosition error: " + error.message);
  }
};
