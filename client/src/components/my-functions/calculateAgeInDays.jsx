export default (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
  
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  
    const diffDays = Math.floor(Math.abs((currentDate - birthDate) / oneDay));
  
    return diffDays;
}