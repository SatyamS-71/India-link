import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../firebaseConfig.js";
import CryptoJS from "crypto-js";

export const LoginUser = async (payload) => {
  console.log('in loginuser')
  try {
    
    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);
    if (querySnapshot.empty) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      const snapshotsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const user = snapshotsData[0];
      const decryptedpassword = CryptoJS.AES.decrypt(
        user.password,
        "job-sharing-platform"
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedpassword === payload.password) {
        return {
          success: true,
          message: "Login successful",
          data: { ...user, password: "" },
        };
      } else {
        return {
          success: false,
          message: "Incorrect password",
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async (payload) => {

  try {
    //check if email already exits
    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );
    const querySnapshot = await getDocs(qry);
    if (querySnapshot.size > 0) {  
      return {
        success: false,
        message: "Email already exists",
      };
    }
    //encrypt password
    const encryptedPassword = CryptoJS.AES.encrypt(
      payload.password,
      "job-sharing-platform"
    ).toString();

    payload.password = encryptedPassword;
    // add user to db
    const response = await addDoc(collection(fireDB, "users"), payload);
    return {
      success: true,
      message: "User registered successfully",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
