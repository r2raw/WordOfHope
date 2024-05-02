import GetUserInfo from "./GetUserInfo.js";

export default async (db, hash, data) => {
  try {
    const { username, email, middlename, suffix, firstname, lastname } = data;
    const insertWohUser = await db.query(
      "INSERT INTO wohUser(username, password, userType, email) VALUES ($1, $2 ,$3, $4)",
      [username, hash, "Patient", email]
    );

    console.log("Wohuser row count" + insertWohUser.rowCount)
    const userIdResult = await GetUserInfo(db, username);
    const userId = userIdResult.rows[0].id;

    const userProfile = await db.query(
      "INSERT INTO userProfile ( lastname, firstname, suffix, middlename,  userId) VALUES ($1, $2, $3, $4, $5)",
      [lastname, firstname, suffix, middlename, userId]
    );
    console.log("userProfile row count" + userProfile.rowCount)
  } catch (error) {
    console.error("User registration error: " + error )
  }
};
