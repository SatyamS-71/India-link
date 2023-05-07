import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "../apis/jobs";
import { Col, Row, message } from "antd";
import PageTitle from "../components/PageTitle";
import Filters from "../components/Filters";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [filters, setFilters ] = useState({
    location:'',
    industry:'',
    experience:'',
  });
  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await getAllJobs();
      if (response.success) {
        const approvedJobs = response.data.filter((job) => job.status === 'approved')
        setData(approvedJobs);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
   <Filters
   filter={filters}
   setFilter={setFilters}
   SetData={setData}
   />

   <br></br>
   <hr></hr>

      <Row gutter={[15, 15]}>
        {data.map((job) => (
          <Col span={8}>
            <div className="job-card">
              <h5 className="uppercase">{job.Title}</h5>
              <hr></hr>
         
            <div className = "d-flex flex-column gap-1">
            <div className="d-flex justify-content-between mt-1">
                <span>Company</span>
                <span>{job.company}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Location</span>
                <span>{job.location}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Salary</span>
                <span>{job.salary}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Posted On</span>
                <span>{job.postedOn}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Last Date to Apply</span>
                <span>{job.lastDateToApply}</span>
              </div>
            </div>
              
         {user.id !== 'admin' &&    <button className="primary-outlined-btn w-100 mt-2"
              onClick={()=> navigate(`job-description/${job.id}`)}
              >
                Apply Now 
              </button> }
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
