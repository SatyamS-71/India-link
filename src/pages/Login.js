import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { LoginUser } from "../apis/authentication";
import { useDispatch } from "react-redux";
import { ShowLoading } from "../redux/alertSlice";
import { HideLoading } from "../redux/alertSlice";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await LoginUser(values);
      if (response.success) {
        dispatch(HideLoading())
        message.success(response.message);
        localStorage.setItem("user", JSON.stringify(response.data));

        window.location.href = "/";
      } else {
        dispatch(HideLoading())
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
      <div className="bg-white p-2 w-400">
        <h3>LOGIN</h3>
        <hr></hr>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" required>
            <input type="text" required></input>
          </Form.Item>

          <Form.Item name="password" label="Password" required>
            <input type="password" required></input>
          </Form.Item>
          <button className="primary-contained-btn w-100 mt-2" type="submit">
            Login
          </button>
          <Link to="/register" className="d-block mt-2">
            Not a member? Click here to register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
