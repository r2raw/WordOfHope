export default async (db, email) => {
    return await db.query(
    "SELECT id from wohUser WHERE email=$1",
    [email]
  );
};
