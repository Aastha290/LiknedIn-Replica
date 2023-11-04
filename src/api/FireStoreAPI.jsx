import { firestore } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot, getDoc, doc, updateDoc, query, where, setDoc, deleteDoc, } from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");


export const postStatus = async (Object) => {
    addDoc(postsRef, Object)
        .then(() => {
            toast.success('Post has been added successfully');
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getStatus = (setAllStatus) => {
    onSnapshot(postsRef, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postsRef, where("user ID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })[0]
        );
    });
};

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => { })
        .catch((err) => {
            console.log(err);
        });
};

export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), userID: docs.id };
            })
                .filter((item) => {
                    return item.email === localStorage.getItem("userEmail");
                })[0]
        );
    });

};

export const editProfile = (userID, payLoad) => {
    let userToEdit = doc(userRef, userID);

    updateDoc(userToEdit, payLoad)
        .then(() => {
            toast.success("Profile has been updated successfully");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const likePost = async (userId, postId, liked) => {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    try {
        const docSnapshot = await getDoc(docToLike);
        if (docSnapshot.exists()) {
            if (liked) {
                deleteDoc(docToLike);
            } else {
                setDoc(docToLike, { userId, postId });
            }

            deleteDoc(docToLike);
            console.log("unliked successfully")
        }

        else {
            setDoc(docToLike, { userId, postId });
            console.log("liked it");
        }
    } catch (err) {
        console.log(err);
        console.log("fetched error while liking")
    }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where('postId', '==', postId));

        onSnapshot(likeQuery, (response) => {
            const likes = response.docs.map((doc) => doc.data());
            const likesCount = likes?.length;

            const isLiked = likes.some((like) => like.userId === userId);
            setLikesCount(likesCount);
            setLiked(isLiked);
        });
    } catch (error) {
        console.log(error);
    }
};

export const postComment = (postId, comment, timeStamp, name) => {
    try {
       addDoc(commentsRef, {
        postId,
        comment,
        timeStamp,
        name,
       });
    }
    catch(err){
        console.log(err)
    }
};

export const getComments = (postId, setComments) => {
    try {
      let singlePostQuery = query(commentsRef, where("postId", "==", postId));
  
      onSnapshot(singlePostQuery, (response) => {
        const comments = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setComments(comments);
      });
        
    } catch(err){
        console.log(err);
    }
};