import React from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { getPostedJobsByUserId ,deleteJob, deleteJobById, getApplicationsByUserId, getAllApplications, deleteApplication } from "../../apis/jobs";
import { Table, message } from "antd";

function AllApplications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);


  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllApplications();
      if (response.success) {
        setData(response.data);
      }
   
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

 



  const columns = [
    {
        title:'JobId',
        dataIndex:'jobId',
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    {
        title:"Action",
        dataIndex:'action',
        render:(text,record) =>(
          <div className='d-flex gap-3 align-items-center' >
            <i class = "ri-delete-bin-line" onClick={async() =>{
                  try {
                    dispatch(ShowLoading());
                    const response = await deleteApplication(record.id);
                    if (response.success) {
                     message.success(response.message + `You may wanna reload the page!`);
                    }
                    navigate('/admin/applications');
                    dispatch(HideLoading());
                  } catch (error) {
                    dispatch(HideLoading());
                    message.error(error.message);
                  }
            }
                } ></i>
          </div>
        )
      }
  ];



  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    <div className="d-flex justify-content-between">
      <PageTitle title="Applications" />
    </div>
    <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllApplications;
