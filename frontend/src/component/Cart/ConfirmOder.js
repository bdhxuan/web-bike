import React, {Fragment, useEffect, useRef} from 'react';
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import Title from '../layout/Title';
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { createOrder, clearErrors } from "../../Actions/orderAction";


const ConfirmOder = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,0
  );
  const shippingCharges = subtotal > 5000000 ? 0 : 100000;

  const totalPrice = subtotal + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.ward}, ${shippingInfo.district}, ${shippingInfo.city}`;

   const proceedToPayment = () => {
    const order = {
      shippingInfo,
      user: user.username,
      orderItems: cartItems,
      subtotal,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(order));
    payBtn.current.disabled = false;
    dispatch(createOrder(order));
    navigate("/order/success");
  };

  useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
      <Title title="Xác nhận đơn hàng" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshipping">
            <h3>Địa chỉ giao hàng</h3>
            <div className="confirmshippingBox">
              <div>
                <p>Tên:</p>
                <span>{user.username}</span>
              </div>
              <div>
                <p>SĐT:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <h3>Sản phẩm của bạn:</h3>
            <div className="confirmCartItemsContainer">
              {cartItems && cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.productname}
                    </Link>{" "}
                    <span> 
                      {item.quantity} x {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(item.price)} = {" "}
                      <b>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(item.price * item.quantity)}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <h3>Đơn hàng của bạn</h3>
            <div>
              <div>
                <p>Tạm tính:</p>
                <span>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(subtotal)}</span>
              </div>
              <div>
                <p>Phí giao hàng:</p>
                <span>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(shippingCharges)}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p><b>TỔNG CỘNG:</b></p>
              <span>{new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(totalPrice)}</span>
            </div>

            <button ref={payBtn} onClick={proceedToPayment}>Thanh toán</button>
          </div>
        </div>
      </div>
    </Fragment>
      )}
    </Fragment>
  )
}

export default ConfirmOder;
