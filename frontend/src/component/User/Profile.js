import React, { Fragment, useEffect } from 'react'
import { useSelector } from "react-redux";
import Title from "../layout/Title";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {

    const { user, isAuthenticated , loading} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const roleHandle = (e) => {
      e.preventDefault();
       if(user.role === "admin") {
        navigate("/admin/dashboard")
       }
       else if(user.role === "thành viên"){
           navigate("/")
       }
    }
   

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <Title title={`${user.name}`} />
            <div className="profileContainer">
                <div>
                  <h1>TÀI KHOẢN CỦA TÔI</h1>
                  <img src={"/user.png"} alt={user.name} />
                  <Link to="/me/update">CHỈNH SỬA TÀI KHOẢN</Link>
                  </div>
                  <div>
                  <div>
                      <h4>Họ Tên:</h4>
                      <p>{user.username}</p>
                  </div>
                  <br />
                  <div>
                      <h4>Email:</h4>
                      <p>{user.email}</p>
                  </div>
                  <br />
                  <div>
                      <h4>Vai trò:</h4>
                      <p>{user.role}</p>
                  </div>
                  <input type="submit" value="ĐI ĐẾN" className="signupBtn" onClick={roleHandle} />
                </div>
            </div>
        </Fragment>
     )}
    </Fragment>
  )
}

export default Profile;
