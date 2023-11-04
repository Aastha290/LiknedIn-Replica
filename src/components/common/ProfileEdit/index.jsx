import React, {useState} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { editProfile } from '../../../api/FireStoreAPI';
import "./index.scss";

export default function ProfileEdit({ onEdit, currentUser }) {
  const [editInputs, setEditInputs] = useState(currentUser);
  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInputs({...editInputs, ...input});
  };

  const updateProfileData = async() => {
    await editProfile(currentUser?.userID, editInputs);
    await onEdit();
  };

  return (
    <div className="profile-card">
        <div className='edit-btn'>
        < AiOutlineClose className="close-icon" onClick={onEdit} size={25}/>
        </div>
            <div className='profile-edit-inputs'>
               <label>Name</label>
            <input 
            onChange={getInput}
            className='common-input' 
            placeholder='Name'
            name= "name"
            value={editInputs.name}
            />
            <label>Headline</label>
            <input 
            onChange={getInput}
            className='common-input' 
            placeholder='Headline' 
            value={editInputs.headline}
            name= "headline"
            />
             <label>Country</label>
            <input             
            onChange={getInput}
            className='common-input' 
            placeholder='country'
            value={editInputs.country}
            name= "country" 
            />
            <label>City</label>
            <input             
            onChange={getInput}
            className='common-input' 
            placeholder='city'
            value={editInputs.city}
            name= "city" 
            />
            <label>Company</label>
            <input            
            onChange={getInput}
            className='common-input' 
            placeholder='Comapany' 
            value={editInputs.company}
            name= "company"
            />
            <label>Industry</label>
            <input            
            onChange={getInput}
            className='common-input' 
            placeholder='industry' 
            value={editInputs.industry}
            name= "industry"
            />
            <label>College</label>
            <input 
              onChange={getInput}
              className='common-input' 
              placeholder='College'
              name= "college"
              value={editInputs.college}
              />
              <label>Website</label>
            <input             
            onChange={getInput}
            className='common-input' 
            placeholder='website'
            value={editInputs.website}
            name= "website" 
            />
            <label>About</label>
            <textarea             
            onChange={getInput}
            className='common-textarea' 
            rows={5}
            placeholder='About Me'
            value={editInputs.aboutme}
            name= "aboutme" 
            />
            <label>Skills</label>
            <input             
            onChange={getInput}
            className='common-input' 
            placeholder='skills'
            value={editInputs.skills}
            name= "skills" 
            />
            
            </div>
            <div className='save-container'>
            <button className='save-btn' onClick={updateProfileData}>Save</button>
            </div>
        </div>
  );
}
