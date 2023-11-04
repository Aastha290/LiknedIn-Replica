import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getAllUsers } from "../../../api/FireStoreAPI";
import LikeButton from '../LikeButton';
import "./index.scss";

export default function PostsCard({ posts, id }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  console.log(allUsers);
  
  return (
    <div className="posts-card" key={id}>
      <p
        className="name"
        onClick={() =>
          navigate('/profile', {
            state: { id: posts?.userId, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
      <p className="timeStamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>

      {currentUser && <LikeButton
        userId={currentUser?.userID}
        postId={posts.id}
        currentUser={currentUser}
      />}
    </div>
  );
}
