import React from "react";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import { Zoom } from "@mui/material";
function LoginForm() {
  return (
    <Zoom in={true}>
      <form className="login-form" method="post" onSubmit={(e)=> e.preventDefault()}>
        <LeftForm />
        <RightForm />
      </form>
    </Zoom>
  );
}

export default LoginForm;
