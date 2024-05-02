

async function UpdateMyPatientProfile(db, data){
    try {
      const {
        lastname,
        firstname,
        middlename,
        suffix,
        birthdate,
        sex,
        email,
        phone,
        street,
        province,
        city,
        barangay,
        zip,
        userId,
      } = data.formData;

  
      // Update the database

      const userUpdt = await db.query("UPDATE wohUser set email=$1 WHERE id=$2",[email, userId])
      console.log(userUpdt)
      const result = await db.query(
        "UPDATE userProfile SET lastname=$1, firstname=$2, middlename=$3, suffix=$4, birthdate=$5, sex=$6, phone=$7, street=$8, province=$9, city=$10, barangay=$11, zip=$12 WHERE userId=$13",
        [
          lastname,
          firstname,
          middlename,
          suffix,
          birthdate,
          sex,
          phone,
          street,
          province,
          city,
          barangay,
          zip,
          userId,
        ]
      );

     
      if (result.rowCount > 0){
        return "success"
      }
    } catch (error) {
      console.log("Update Patient Error: " + error.message);
    }
  };
  

  export default UpdateMyPatientProfile;