function passwordValidation(values) {
  const passPatern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|<>?]).{8,}$/;
  let error = {};

  if (values.newpassword === "") {
    error.newpassword = "Input should not be empty.";
  } else if (!passPatern.test(values.newpassword)) {
    error.newpassword = "Invalid password format.";
  } else {
    error.newpassword = "";
  }

  if (values.confirmpassword === "") {
    error.confirmpassword = "Input should not be empty.";
  } else if (!passPatern.test(values.confirmpassword)) {
    error.confirmpassword = "Invalid password format.";
  } else if (values.newpassword !== values.confirmpassword) {
    error.confirmpassword = "Password does not match.";
  } else {
    error.confirmpassword = "";
  }
  return error;
}

export default passwordValidation;
