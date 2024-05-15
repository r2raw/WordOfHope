import _ from "lodash";
export default async (db, service_type, service_name, id)=>{
    try {
        const sql = "SELECT COUNT(*) FROM services WHERE LOWER(service_name)=$1 AND id!=$2"
        const result = await db.query(sql, [_.trim(_.toLower(service_name)), id])

        return result.rows[0].count;
    } catch (error) {
        console.error("existing service error: "  + error.message)
    }
}