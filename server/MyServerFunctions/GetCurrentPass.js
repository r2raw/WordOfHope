export default async (db, username)=>{
    const getUserResult = await db.query(
        "SELECT password FROM wohUser WHERE username=$1",
        [username]
      );

      return getUserResult.rows[0].password;
}