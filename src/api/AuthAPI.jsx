import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const LoginAPI = async (email, password) => {
  try {
  let response = await signInWithEmailAndPassword(auth, email, password);
  return response;
  }
  catch (err) {
    return err;
  }
};

export const RegisterAPI = async (email, password) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password)
    return response;
  } 
  catch(error) {
    return error;
  }
};

export const GoogleSignInAPI = async (email, password) => {
  try {
    let googleProvider = new GoogleAuthProvider(email, password);
    let res = await signInWithPopup(auth, googleProvider);
    return res;
  } 
  catch(err) {
    return err;
  }
};

export const onLogout = () => {
  try {
    signOut(auth);
  }
  catch (err) {
    return err;
  }
};