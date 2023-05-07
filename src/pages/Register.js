import React from 'react'
import { Form , message } from "antd";
import {Link} from 'react-router-dom'
import { Button } from "antd";
import {RegisterUser} from '../apis/authentication';
import { ShowLoading } from '../redux/alertSlice';
import { HideLoading } from '../redux/alertSlice';
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const onFinish = async(values) =>{
      
        try{
          dispatch(ShowLoading());
            const response = await RegisterUser(values);
     
            if(response.success){
              dispatch(HideLoading());
              message.success(response.message);
              navigate('/login');
            }else{
              dispatch(HideLoading());
                message.error(response.message);
            }
        }catch(error){
          dispatch(HideLoading());
          message.error(error.message);
        }

    }

  return (
    <div className="h-screen d-flex justify-content-center align-items-center bg-primary">
    <div className="bg-white p-2 w-400">
      <h3>REGISTER</h3>
      <hr></hr>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="email" label="Email" required>
          <input type="text" required></input>
        </Form.Item>
        <Form.Item name="Name" label="Name" required>
          <input type="text" required></input>
        </Form.Item>

        <Form.Item name="password" label="Password" required>
          <input type="password" required></input>
        </Form.Item>
        <button className="primary-contained-btn w-100 mt-2"  type="submit">
          Register
        </button>
        <Link to ="/login" className = "d-block mt-2" >
          Already a member? Click here to login
        </Link>
      </Form>
    </div>
  </div>
  )
}

export default Register