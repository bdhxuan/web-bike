import React, { Fragment, useEffect, useState } from 'react';
import Title from '../layout/Title';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER_RESET } from "../../Constants/userConstant";
import { getUserDetails, updateUser, clearErrors } from "../../Actions/userAction";
import Loader from "../layout/Loader/Loader";
import {useParams} from "react-router-dom"


const UpdateUser = () => {

     const dispatch = useDispatch();

     const {id} = useParams();

     const navigate = useNavigate();

     const { loading, error, user } = useSelector((state) => state.userDetails);

    const {loading: updateLoading, error: updateError, isUpdated} = useSelector((state) => state.profile);

    const [username, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const userId = id;


    const updateUserSubmitHandle = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("username", username);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setuserName(user.username);
            setEmail(user.email);
            setPassword(user.password);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            window.alert(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            window.alert("Cập nhật tài khoản người dùng thành công!");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch,error, navigate, isUpdated, updateError, user, userId]);

  return (
    <Fragment>
      <Title title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form className="createProductForm" onSubmit={updateUserSubmitHandle}>
              <h1>Cập nhật tài khoản người dùng</h1>

              <div>
                <input type="text" placeholder="Tên" required value={username} onChange={(e) => setuserName(e.target.value)}/>
              </div>
              <div>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <div>
                <input type="password" placeholder="Mật khẩu" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Chọn vai trò người dùng</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button id="createProductBtn" type="submit" disabled={ updateLoading ? true : false || role === "" ? true : false }>
                Cập nhật
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser
