import React, {Fragment, useState} from 'react';
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../Actions/cartAction";
import Title from '../layout/Title';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';


const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [ward, setWard] = useState(shippingInfo.ward);
    const [district, setDistrict] = useState(shippingInfo.district);
    const [city, setCity] = useState(shippingInfo.city);
    const [phone, setPhone] = useState(shippingInfo.phone);

    const shippingSubmit = (e) => {
    e.preventDefault();

    if (phone.length < 10 || phone.length > 10) {
      window.alert("SĐT có độ dài là 10");
      return;
    }
    dispatch( saveShippingInfo({ address, ward, district, city, phone}));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
        <Title title="Địa chỉ giao hàng" />

        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
            <div className="shippingBox">
                <h2 className="shippingHeading">Địa chỉ giao hàng</h2>
                <form className="shippingForm" encType="multipart/form-data"onSubmit={shippingSubmit}>
                    
                    <div>
                        <input type="text" placeholder="Tỉnh/Thành Phố:" required value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <br/>
                    <div>
                        <input type="text" placeholder="Quận/Huyện:" required value={district} onChange={(e) => setDistrict(e.target.value)} />
                    </div>
                    <br/>
                    <div>
                        <input type="text" placeholder="Xã/Phường:" required value={ward} onChange={(e) => setWard(e.target.value)} />
                    </div>
                    <br/>
                    <div>
                        <input type="text" placeholder="Địa chỉ chi tiết:" required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <br/>
                    <div>
                        <input type="number" placeholder="SĐT:" required value={phone} onChange={(e) => setPhone(e.target.value)} size="10" />
                    </div>
                    <input type="submit" value="tiếp tục" className="shippingBtn"  />
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Shipping
