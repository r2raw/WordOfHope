import _ from 'lodash'
export default async (db, dept_id, position)=>{
    try {
        const sql = 'SELECT COUNT(*) FROM positions WHERE department_id=$1 AND position_name=$2'
        const result = await db.query(sql, [dept_id, position])

        return result.rows[0].count
    } catch (error) {
        console.error('check existing positions error: ' + error.message)
    }
}