export default async (db, username) => {
    return await db.query(
    "SELECT id from wohUser WHERE username=$1",
    [username]
  );
};
