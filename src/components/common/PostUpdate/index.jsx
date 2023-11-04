import React, { useState, useMemo } from 'react'
import { postStatus, getStatus } from '../../../api/FireStoreAPI';
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from '../Modal';
import { getUniqueID } from "../../../helpers/getUniqueId.jsx";
import PostsCard from '../PostsCard';

import "./PostUpdate.scss";

export default function PostStatus({ currentUser }) {
  // let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
    };
    try {
      await postStatus(object);
    }
    catch {
      console.log('"error posting');
    }
    setModalOpen(false);
    setStatus("");
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)} >
          Start a Post
        </button>
      </div>
      <ModalComponent setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} status={status} sendStatus={sendStatus} />

      <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id} >
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
