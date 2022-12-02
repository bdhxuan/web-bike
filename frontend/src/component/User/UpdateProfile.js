import React, {Fragment, useState, useEffect} from 'react'
import Title from '../layout/Title';
import "./UpdateProfile.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, loadUser ,clearErrors} from '../../Actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstant";

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector( (state) => state.user);
    const { error, isUpdated} = useSelector((state) => state.profile);

    
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
      myForm.set("username", username);
      myForm.set("email", email);
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setuserName(user.username);
      setEmail(user.email);
    }

    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      window.alert("Cập nhật tài khoản thành công");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  return (
    <Fragment>
          <Title title="Cập nhật tài khoản" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">CẬP NHẬT TÀI KHOẢN</h2>
              <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                  <i className='fa-solid fa-user'></i>
                  <input type="text" placeholder="Tên" required name="name" value={username} onChange={(e) => setuserName(e.target.value)} />
                </div>
                <br />
                <div className="updateProfileEmail">
                  <i className='fa-solid fa-envelope'></i>
                  <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div className="updateProfileOldPassword">
                 <i className='fa-solid fa-key'></i>
                  <input type="password" placeholder="Mật khẩu hiện tại" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <br />
                <div className="updateProfileNewPassword">
                  <i className='fa-solid fa-unlock'></i>
                  <input type="password" placeholder="Mật khẩu mới" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <br />
                <div className="updateProfileComfirmPassword">
                 <i className='fa-solid fa-lock'></i>
                  <input type="password" placeholder="Xác nhận mật khẩu mới" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <input type="submit" value="CẬP NHẬT" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
  )
}

export default UpdateProfile;
