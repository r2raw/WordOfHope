function passwordValidation(values) {
    const passPatern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|<>?]).{8,}$/;
    let error = {};
   if (!passPatern.test(values.password.value)) {
      error.password = "Invalid password format.";
    } else {
      error.password = "";
    }
  if (!passPatern.test(values.confirmpass.value)) {
      error.confirmpass = "Invalid password format.";
    } else if (values.password.value !== values.confirmpass.value) {
      error.confirmpass = "Password does not match.";
    } else {
      error.confirmpass = "";
    }
    console.log(error)
    return error;
  }
  
  export default passwordValidation;