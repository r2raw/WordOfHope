import _ from "lodash";
export default async (db, service_type, service_name)=>{
    try {
        const sql = "SELECT COUNT(*) FROM services WHERE service_type=$1 AND LOWER(service_name)=$2"
        const result = await db.query(sql, [service_type, _.trim(_.toLower(service_name))])

        return result.rows[0].count;
    } catch (error) {
        console.error("existing service error: "  + error.message)
    }
}