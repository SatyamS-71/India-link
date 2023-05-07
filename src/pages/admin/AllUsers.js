import React from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import {
  getPostedJobsByUserId,
  deleteJob,
  deleteJobById,
  editJobDetails,
} from "../../apis/jobs";
import { Table, message } from "antd";
import { getAllUsers, updateUserProfile } from "../../apis/users";

function AllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);

  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await getAllUsers();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const changeStatus = async (id,status) => {
    try{
        dispatch(ShowLoading());
        const response = await updateUserProfile({id,status});
        if(response.success){
            setData(response.data);
            getData();
        }
        dispatch(HideLoading());
    }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "User Id",
      dataIndex: "id",
    },
    {
      title:"Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
       
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "rejected")}
            >
              Reject
            </span>
          )}
          
          { (record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record.id, "approved")}
            >
              {" "}
              Approve{" "}
            </span>
          )}
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="All Users" />
       
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllUsers;
