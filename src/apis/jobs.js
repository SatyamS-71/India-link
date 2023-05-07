import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { fireDB } from "../firebaseConfig";
import moment from "moment";

export const addNewJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    await addDoc(collection(fireDB, "jobs"), {
      ...payload,
      status: "pending",
      status: "pending",
      postedByUserId: user.id,
      postedByUserName: user.Name,
      postedOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    //send notification to admin
    await addDoc(collection(fireDB, "users", "admin", "notifications"), {
      title: `New Job Post Request from ${user.Name}`,
      onClick: `/admin/jobs`,
      createdAt: moment().format("DD-MM-YYYY HH:mm A"),
      status: "unread",
    });

    return {
      success: true,
      message: "Job posted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong`,
    };
  }
};

export const getPostedJobsByUserId = async (userId) => {
  try {
    const jobs = [];
    const qry = query(collection(fireDB, "jobs"), orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      if (doc.data().postedByUserId === userId) {
        jobs.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getJobById = async (id) => {
  try {
    const docRef = doc(fireDB, "jobs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        success: true,
        data: docSnap.data(),
      };
    } else {
      return {
        success: false,
        message: "No such job!",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const editJobDetails = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updateOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
export const changeJobStatusFromAdmin = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "jobs", payload.id), {
      ...payload,
      updateOn: moment().format("DD-MM-YYYY HH:mm A"),
    });
    await addDoc(
      collection(fireDB, "users", payload.postedByUserId, "notifications"),
      {
        title: `${payload.status === 'approved' ? 'Your Job is Visible':''} Your job post request for ${payload.Title} has been ${payload.status}` ,
        onClick: "/posted-jobs",
        createdAt: moment().format("DD-MM-YYYY HH:mm A"),
        status: "unread",
      }
    );

    return {
      success: true,
      message: "Job updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deleteJobById = async (id) => {
  try {
    await deleteDoc(doc(fireDB, "jobs", id));
    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllJobs = async(filters) => {
  try {
   // let whereConditions = [];
    // console.log(filters);
    // if (filters) {
    //   Object.keys(
    //     filters.forEach((key) => {
    //       if (filters[key]) {
    //         whereConditions.push(where(key, "==", filters[key]));
    //       }
    //     })
    //   );
    // }
    // const jobs = [];
    // const qry = query(
    //   collection(fireDB, "jobs"),
    //   ...whereConditions,
    //   orderBy("postedOn", "desc")
    // );
    // const querySnapshot = await getDocs(qry);
    // querySnapshot.forEach((doc) => {
    //   jobs.push({ id: doc.id, ...doc.data() });
    // });

    const jobs = [];
    const qry = query(
        collection(fireDB, "jobs"),
        orderBy("postedOn", "desc")
      );
      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });
    

    // console.log(jobs);
    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const applyJobPost = async (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const job = payload;
  try {
    await addDoc(collection(fireDB, "applications"), {
      jobId: job.id,
      jobTitle: job.Title,
      company: job.company,
      userId: user.id,
      userName: user.Name,
      email: user.email,
      phoneNumber: user?.phoneNumber || "",
      appliedOn: moment().format("DD-MM-YYYY HH:MM A"),
      status: "pending",
    });
    return {
      success: true,
      message: "Job applied successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
};

export const getApplicationsByUserId = async (userId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getApplicationsByJobId = async (jobId) => {
  try {
    const applications = [];
    const qry = query(
      collection(fireDB, "applications"),
      where("jobId", "==", jobId)
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications = [];
    const qry = query(collection(fireDB, "applications"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const changeApplicationStatus = async (payload) => {
  try {
    await updateDoc(doc(fireDB, "applications", payload.id), {
      status: payload.status,
    });

    //send notifications to user
    await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
      title: `###Your application for ${payload.jobTitle} by ${payload.company} is ${payload.status} , interviewer is requesting for a quick interview link:${payload.link}`,
      onClick: `/Interview/${payload.link}`,
      status: "unread",
      createdAt: moment().format("DD-MM-YYYY HH:mm A"),
    });

    return {
      success: true,
      message: "Application status updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const deleteApplication = async(Id)=>{
  try {
    await deleteDoc(doc(fireDB, "applications", Id));
    return {
      success: true,
      message: "Application deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }

}