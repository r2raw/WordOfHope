export default (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
  
    let ageInMonths = (currentDate.getFullYear() - birthDate.getFullYear()) * 12;
  
    // Calculate the difference in months
    ageInMonths -= birthDate.getMonth();
    ageInMonths += currentDate.getMonth();
  
    // If the current date hasn't reached the birth date day yet, subtract one month
    if (currentDate.getDate() < birthDate.getDate()) {
        ageInMonths--;
    }
  
    return ageInMonths;
}

