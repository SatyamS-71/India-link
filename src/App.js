import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Home from "./pages/Home.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import PublicRoute from "./components/PublicRoute.js";
import { useSelector } from "react-redux";
import Loader from "./components/Loader.js";
import "./stylesheets/custom-components.css";
import AppliedJobs from "./pages/user/AppliedJobs.js";
import Profile from "./pages/user/profile/index.js";
import PostedJobs from "./pages/user/postedjobs/index.js";
import NewEditJob from "./pages/user/postedjobs/NewEditJob.js";
import Alljobs from "./pages/admin/Alljobs.js";
import AllUsers from "./pages/admin/AllUsers.js";

import JobDesciption from "./pages/JobDesciption.js";
import Notifications from "./pages/Notifications.js";
import AllApplications from "./pages/admin/AllApplications.js";
import Interview from "./components/Interview.js";

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="">
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {" "}
                <Home />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                {" "}
                <Login />{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                {" "}
                <Register />{" "}
              </PublicRoute>
            }
          />
          <Route
            path="/applied-jobs"
            element={
              <ProtectedRoute>
                {" "}
                <AppliedJobs />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                {" "}
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
            <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                {" "}
                <Notifications />{" "}
              </ProtectedRoute>
            }
          />
          <Route 
          path='/posted-jobs/edit/:id'
          element={
            <ProtectedRoute>
              <NewEditJob/>
            </ProtectedRoute>
          }
          />
          <Route 
          path='/posted-jobs/new'
          element={
            <ProtectedRoute>
              <NewEditJob />
            </ProtectedRoute>
          }
          />
          <Route 
          path='/posted-jobs'
          element={
            <ProtectedRoute>
              <PostedJobs />
            </ProtectedRoute>
          }
          />
            <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <Alljobs />
              </ProtectedRoute>
            }
          />

           <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute>
                <AllApplications />
              </ProtectedRoute>
            }
          />
            <Route
            path="/job-description/:id"
            element={
              <ProtectedRoute>
                {" "}
                <JobDesciption />{" "}
              </ProtectedRoute>
            }
          />
             <Route
            path="/interview/:roomid"
            element={
              <ProtectedRoute>
                {" "}
                <Interview />
              </ProtectedRoute>
            }
          />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
