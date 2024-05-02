import React from "react";
import LoginForm from "./LoginForm";
import { Zoom } from "@mui/material";
import ClientNav from "../client-side/ClientNav";
import Footer from "../client-side/footer/Footer";
// import "../css/style.css"
function Login() {
  return (
    <section className="login">
      {/* <ClientNav /> */}
      <div className="login-container">
        <div className="black-bg">
          <Zoom in={true}>
            <h1>Word of Hope General Hospital</h1>
          </Zoom>
          <LoginForm />
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  );
}

export default Login;
