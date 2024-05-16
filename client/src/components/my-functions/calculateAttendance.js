export default (startTime, endTime) => {
    const start = startTime;
    let end = endTime;
  
   
    // if (end <= start) {
    //   end = new Date("1970-01-02T" + endTime);
    // }
  
    let timeDiff = end - start;
  
    
    if (timeDiff === 0 && startTime === "00:00:00" && endTime === "00:00:00") {
      timeDiff = 24 * 60 * 60 * 1000; 
    }
  
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    return { hours, minutes: remainingMinutes };
};