async function GetMyProfileData(db, data) {
  console.log(data);
  const patientResult = await db.query(
    "SELECT userProfile.*, wohUser.email FROM userProfile JOIN wohUser ON userProfile.userId = wohUser.id WHERE userProfile.userId=$1",
    [data.formData.userId]
  );

  const patientInfos = [];
  

  patientResult.rows.forEach((info) => {
    patientInfos.push(info);
  });

  return patientInfos;
}

export default GetMyProfileData;
