import { Modal, Table, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../../redux/alertSlice";
import { changeApplicationStatus } from "../../../apis/jobs";

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appliedCandidates,
  reloadData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"))
  const changeStatus = async (applicationData,status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeApplicationStatus({
        ...applicationData,
        status,
        link:`${user.id + '' + user.email}` ,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        reloadData(applicationData.jobId);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Something went wrong");
      dispatch(HideLoading());
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text, record) => {
        return <Link to={`/profile/${record.userId}`}> {text} </Link>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                {" "}
                <span
                  className="underline"
                  onClick={() =>{

                    changeStatus(record, "approved")
                  
                  }
                  }
                >
                  Approve
                </span>
                <span
                  className="underline mx-2"
                  onClick={() =>
                    changeStatus(record, "rejected")
                  }
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={columns}
          colums={columns}
          dataSource={appliedCandidates}
          rowkey="id"
        />
      </Modal>
    </div>
  );
}

export default AppliedCandidates;
