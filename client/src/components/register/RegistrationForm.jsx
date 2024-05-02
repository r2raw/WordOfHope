import React from "react";
import { Zoom } from "@mui/material";
import LeftRegForm from "./LeftRegForm";
import RightRegForm from "./RightRegForm";

function RegistrationForm() {
  
  // const socket = io.connect("http://localhost:5000/UserAuth");
  return (
    <Zoom in={true}>
      <form className="reg-form" method="post" onSubmit={(e) => e.preventDefault()}>
        <LeftRegForm />
        <RightRegForm />
      </form>
    </Zoom>
  );
}

export default RegistrationForm;
