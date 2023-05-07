import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import {
  applyJobPost,
  getApplicationByJobId,
  getApplicationsByJobId,
  getJobById,
} from "../apis/jobs";
import { Col, Row, message } from "antd";
import PageTitle from "../components/PageTitle";

function JobDesciption() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobData, setJobData] = React.useState(null);
  const [showApplyButton, setShowApplyButton] = React.useState(true);
    const [alreadyApplied,setAlreadyApplied] = React.useState(false);
    const user = JSON.parse(localStorage.getItem("user"))
    const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await getJobById(params.id);
      if (
        response.data.postedByUserId ===
        JSON.parse(localStorage.getItem("user")).id
      ) {
        setShowApplyButton(false);
      }
      const applicationsResponse = await getApplicationsByJobId(params.id); //(params.id);
      if (
        applicationsResponse.data.filter(
          (item) => item.userId === user.id
        ).length > 0
      ) {
        setShowApplyButton(false);
        setAlreadyApplied(true);
      }

      dispatch(HideLoading());
      console.log(response);
      if (response.success) {
        setJobData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const applyNow = async () => {
    try {
      dispatch(ShowLoading());
      const response = await applyJobPost(jobData);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.Title} />

        <Row>
          <Col span={24}>
            <div className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-between mt-1">
                <span>Company</span>
                <span>{jobData.company}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Location</span>
                <span>{jobData.location.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Salary</span>
                <span>{jobData.salary}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Experience</span>
                <span>{jobData.experience} Years</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Notice Period</span>
                <span>{jobData.noticePeriod} Days</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Posted On</span>
                <span>{jobData.postedOn}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Job Type</span>
                <span>{jobData.jobType}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Industry</span>
                <span>{jobData.industry.toUpperCase()}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Last Date to Apply</span>
                <span>{jobData.lastDateToApply}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Posted By</span>
                <span>{jobData.postedByUserName}</span>
              </div>
            </div>
            <hr></hr>
            <h4 className="underline"> Job Description </h4>
            <br></br>
            <textarea className="pt-2" readOnly style={{ cursor: "default" }}>
              {jobData.jobDescription}
            </textarea>

          
                {alreadyApplied && (
                    <div className="already-applied">
                  <span> You have already applied for this job. You can view your application status in the applied job section.</span> 
                  </div> )}
           
            <div className="d-flex gap-2">
              <button
                className="primary-outlined-btn"
                onClick={() => navigate("/")}
              >
                CANCEL
              </button>
              {showApplyButton && (
                <button className="primary-contained-btn" onClick={applyNow}>
                  APPLY NOW
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default JobDesciption;
