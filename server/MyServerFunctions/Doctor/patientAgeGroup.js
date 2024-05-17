export default async (db)=>{
    try {
        const sql = "SELECT CASE WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 0 AND 9 THEN '0-9' WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 10 AND 19 THEN '10-19' WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 20 AND 29 THEN '20-29' WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 30 AND 39 THEN '30-39' WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 40 AND 49 THEN '40-49' WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 50 AND 59 THEN '50-59' WHEN EXTRACT(YEAR FROM age(birthdate)) BETWEEN 60 AND 69 THEN '60-69' ELSE '70+' END AS age_group, COUNT(*) AS patient_count FROM patient GROUP BY age_group ORDER BY age_group"

        const result = await db.query(sql);
        return result.rows
    } catch (error) {
        console.error("patient age group error: " + error.message)
    }
}