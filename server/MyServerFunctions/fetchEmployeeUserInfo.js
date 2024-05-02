export default async (db, uid) => {
  try {
    const result = await db.query(
      "SELECT employee.*, wohUser.email, wohUser.username, wohUser.firsttimelog from employee JOIN wohUser on  employee.userId = wohUser.id  WHERE userId=$1",
      [uid]
    );

    return result;
  } catch (error) {
    console.error("fetchEmployeeUserInfo Error: " + error.message);
  }
};
