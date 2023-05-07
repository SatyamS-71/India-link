import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { getAllJobs } from "../apis/jobs";
import { message } from "antd";

function Filters({ filter, setFilter, SetData }) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    experience: "",
  });
  const filterData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllJobs(filters);
      // console.log(response);
      if (response.success) {
        // console.log(response.data);
        const approvedJobs = response.data.filter(
          (job) =>
            job.status === "approved" &&
            (filters.location === "" || job.location === filters.location) &&
            (filters.industry === "" || job.industry === filters.industry) &&
            (filters.experience === "" || job.experience === filters.experience)
        );
        SetData(approvedJobs);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-start gap-2 ">
        <select
          name=""
          id=""
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="">Location</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">uk</option>
        </select>

        <select
          name=""
          id=""
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
        >
          <option value="">Industry</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>

        <select
          name=""
          id=""
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
        >
          <option value="">Experience</option>
          <option value="0">Fresher</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
        </select>

        <button className="primary-contained-btn" onClick={() => filterData()}>
          FILTER
        </button>
      </div>
    </div>
  );
}

export default Filters;
