import React from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { getPostedJobsByUserId ,deleteJob, deleteJobById, getApplicationsByJobId } from "../../../apis/jobs";
import { Table, message } from "antd";
import AppliedCandidates from "./AppliedCandidates";

function PostedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [showAppliedCandidates,setShowAppliedCandidates] = React.useState(false)
  const [appliedCandidates,setAppliedCandidates] = React.useState(false)
  const InterviewRoom = JSON.parse(localStorage.getItem('user'))
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getPostedJobsByUserId(user.id);
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteJob = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteJobById(id);
      if (response.success) {
        setData(response.data);
        getData()
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const getAppliedCandidates= async(id) =>{
    try{
      dispatch(ShowLoading());
      const response = await getApplicationsByJobId(id);
      if(response.success) {
        setAppliedCandidates(response.data);
        if(!showAppliedCandidates){
          setShowAppliedCandidates(true);
        }
      }
      dispatch(HideLoading());
    }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
    }
  }



  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
    },
    {
      title: "Comapany",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Last Date to Apply",
      dataIndex: "lastDateToApply",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title:"Action",
      dataIndex:'action',
      render:(text,record) =>(
        <div className='d-flex gap-3 align-items-center' >
          <span className="underline" onClick={()=> getAppliedCandidates(record.id)}>
            candidates
          </span>
          <i class="ri-pencil-line" onClick={()=> navigate(`/posted-jobs/edit/${record.id}`)} ></i>
          <i class = "ri-delete-bin-line" onClick={() => deleteJob(record.id)} ></i>
        </div>
      )
    }
  ];



  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
       <PageTitle title="Posted Jobs" />
    <div className="flex justify-content-between">
     
      <Link to="/posted-jobs/new">
        {" "}
        <button className="primary-outlined-btn mt-2 mx-2">Post A New Job</button>
      </Link>
      <Link to= {`/Interview/${InterviewRoom.id + '' + InterviewRoom.email}`}>
      <button className="primary-contained-btn">  <small>Interview Room</small>  </button>
      </Link>
    </div>
    <br></br>
    <Table columns={columns} dataSource={data} />
    {showAppliedCandidates &&
     <AppliedCandidates
    showAppliedCandidates={showAppliedCandidates}
    setShowAppliedCandidates={setShowAppliedCandidates}
    appliedCandidates={appliedCandidates}
    reloadData={getAppliedCandidates}
    
  />}
    </div>
  );
}

export default PostedJobs;
