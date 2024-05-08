import _ from "lodash"
export default async(db, email) =>{
    try {
        const userEmail = _.trim(_.toLower(email));
        const sql = "SELECT COUNT(*) FROM wohUser WHERE LOWER(email)=$1"
        const result = await db.query(sql, [userEmail])
        
        return result.rows[0].count;
    } catch (error) {
        console.error("CHECK existingEmail ERROR: " + error.message)
    }
}