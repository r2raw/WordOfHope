
  
  export default async (db, empid, startTime, endTime, day, createdBy) => {
    try {
      const sql = "INSERT INTO employeeSched(empid, startTime, endTime, day, createdBy) VALUES ($1, $2, $3, $4, $5)";

      const result = await db.query(sql, [empid, startTime, endTime, day, createdBy]);
  
      return result;
    } catch (error) {
      console.error("INSERTSCHEDULE ERROR: " + error.message);
    }
  };
  