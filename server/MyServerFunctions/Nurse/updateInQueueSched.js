export default async (db, id) => {
  try {
    const sql = "UPDATE appointmentSched SET status=$1 WHERE id=$2"

    const result = await db.query(sql, ["In Queue", id])

    if(result.rowCount > 0){
        return true
    }

    return false
  } catch (error) {
    console.error("Update in queue sched error: " + error.message);
  }
};
