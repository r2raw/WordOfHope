export default async (db, id, availability) => {
  try {
    const sql = "UPDATE departments SET availability=$1 WHERE id=$2";
    const result = await db.query(sql, [availability, id]);

    if (result.rowCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("updateDepartmentAvailability ERROR: " + error.message);
  }
};
