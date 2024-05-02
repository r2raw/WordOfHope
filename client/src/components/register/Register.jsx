import React from "react";
import { Zoom } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
function Register(){
    return (
        <section className="register">
          {/* <ClientNav /> */}
          <div className="register-container">
            <div className="black-bg">
              <Zoom in={true}>
                <h1>Word of Hope General Hospital</h1>
              </Zoom>
              <RegistrationForm />
            </div>
          </div>
          {/* <Footer /> */}
        </section>
      );
}

export default Register;