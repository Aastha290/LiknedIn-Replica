import React, {useState} from 'react'
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import user from "../../../assets/user-icon.png";
import { AiFillHome, AiOutlineSearch, AiFillMessage, AiOutlineBell } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { BsFillBriefcaseFill } from "react-icons/bs";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [users, setUsers] = useState([]);
  let navigate = useNavigate()
  const goToRoute = (route) => {navigate(route)};

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };


  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      <div className="react-icons">
      <AiOutlineSearch size={25} className="react-icon"/>
      <AiFillHome size={25} className="react-icon" onClick={() => goToRoute("/home")} />
      <HiOutlineUsers size={25} className="react-icon" onClick={() => goToRoute("/profile")} />
      <BsFillBriefcaseFill size={25} className="react-icon" /> 
      <AiFillMessage size={25} className="react-icon" /> 
      <AiOutlineBell size={25} className="react-icon" />
    </div>
    <img className="user-logo" src={user?.imagelink} alt="user" onClick={displayPopup} />
    </div>
  );
}
