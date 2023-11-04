//import React from "react";
import React, { useState } from "react";
import { RegisterAPI, GoogleSignInAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FireStoreAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from 'react-google-button'
import {useNavigate} from "react-router-dom";
import { getUniqueID } from "../helpers/getUniqueId";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
//<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups"></meta>

export default function RegisterComponent() {
  let navigate = useNavigate();
   const [credentails, setCredentials] = useState({email: "", password: ""});
    
   const register = async () => {
      try {
      let res = await RegisterAPI(credentails.email, credentails.password);
      //let res = await RegisterAPI("aastha@gmail.com", "abcd123");
      toast.success("Account Created!");
      postUserData({ 
        userID: getUniqueID(),
        name: credentails.name,
        email: credentails.email,
      });

      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    }
      catch(err){
        console.log(err);
        toast.error("Can't Created your Account!");
      }
     };

     const GoogleSignIn = async() => {
        try {
      let response = await GoogleSignInAPI()
      console.log(response);
     }
     catch (err) {
        return err;
     }
    };
    return (
      <div className="login-wrapper">
        <img src={LinkedinLogo}className="linkedinLogo"/>
        
        <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />

          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone number"
          />


          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password(6 or more character)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton className="google-btn" onClick={GoogleSignIn} />
        <p className="go-to-signup">
          Already on LinkedIn??{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>      
    </div>  
  );
}
