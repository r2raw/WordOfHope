
function currentDate(){
    const date = new Date();
    const months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let  month  = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let weekDay = date.getDay();


    let currentDate = `Today: ${months[month]} ${day}, ${year} ${days[weekDay]}`;
    return currentDate;

  }

  export {currentDate};