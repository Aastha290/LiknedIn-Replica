import React, {useState, useMemo} from 'react'
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FireStoreAPI";
import Button from '../Button';
import "./index.scss";

export default function ProfilePopup() {
  let  navigate = useNavigate();
  const [currentUser, SetCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(SetCurrentUser);
  }, []);

  return (
    <div className="popup-card">
      <p className='name'>{currentUser.name}</p>
      <p className='headline'>{currentUser.headline}</p>
      <Button title="View Profile" onClick={() => 
        navigate("/profile", {
          state: {
            id: currentUser?.userId,
          },
          })
        }  
        />

        <Button title="Log Out" onClick={onLogout} />   
    </div>
  );
}
