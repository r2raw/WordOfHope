export default async (db, uid) => {
  try {
    const result = await db.query(
      "SELECT employee.*, wohUser.email, wohUser.username, wohUser.firsttimelog, wohUser.usertype, positions.position_name, departments.department_name from employee JOIN wohUser on  employee.userId = wohUser.id JOIN positions on employee.position = positions.id JOIN departments ON employee.department = departments.id WHERE userId=$1",
      [uid]
    );

    return result;
  } catch (error) {
    console.error("fetchEmployeeUserInfo Error: " + error.message);
  }
};
