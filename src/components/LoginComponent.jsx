//import React from "react";
import React, { useState } from "react";
import { LoginAPI, RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from 'react-google-button'
import {useNavigate} from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
//<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups"></meta>

export default function LoginComponent() {
  let navigate = useNavigate();
   const [credentails, setCredentials] = useState({email: "", password: ""});
     const login = async () => {
      try {
      let res = await LoginAPI(credentails.email, credentails.password);
      //let res = await RegisterAPI("aastha@gmail.com", "abcd123");
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    }
      catch(err){
        console.log(err);
        toast.error("Wrong Credentials!");
      }
     };

     const GoogleSignIn = async() => {
      let response = await GoogleSignInAPI();
      navigate("/home");
     };
     
    return (
      <div className="login-wrapper">
        <img src={LinkedinLogo}className="linkedinLogo"/>
        
        <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton className="google-btn" onClick={GoogleSignIn} />
        <p className="go-to-signup">
          New to LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>      
    </div>  
  );
}
