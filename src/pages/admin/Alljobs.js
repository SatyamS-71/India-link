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
  changeJobStatusFromAdmin,
} from "../../apis/jobs";
import { Table, message } from "antd";
import { getAllJobs } from "../../apis/jobs";

function Alljobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);

  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await getAllJobs();
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
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const changeStatus = async (jobData, status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeJobStatusFromAdmin({ ...jobData, status });
      if (response.success) {
        setData(response.data);
        getData();
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex gap-2 align-items-center">
          <i
            class="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "rejected")}
            >
              Reject
            </span>
          )}

          {(record.status === "pending" || record.status === "rejected") && (
            <span
              className="underline"
              onClick={() => changeStatus(record, "approved")}
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
        <PageTitle title="All Jobs" />
        <Link to="/posted-jobs/new">
          {" "}
          <button className="primary-outlined-btn">New Job</button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Alljobs;
