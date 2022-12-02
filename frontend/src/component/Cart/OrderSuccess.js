import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";


const OrderSuccess = () => {


  return (
    <Fragment>
        <CheckoutSteps activeStep={2} />
        <div className="orderSuccess">
            <i className="fa-sharp fa-solid fa-circle-check"></i>
            <br/>
            <h3>Đặt hàng thành công! Đơn hàng của bạn đang được xử lý </h3>
            <Link to="/orders">Xem đơn hàng</Link>
        </div>
    </Fragment>
  );
};

export default OrderSuccess;