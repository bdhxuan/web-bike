import React, {Fragment, useEffect} from 'react';
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Title from "../layout/Title";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../Actions/orderAction";
import Loader from "../layout/Loader/Loader";


const OrderDetails = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    
    const {id }= useParams();

    useEffect(() => {
    if (error) {
      window.alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Chi tiết đơn hàng" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
                <h2>Đơn hàng #{order && order._id}</h2>
                <h3>Thông tin vận chuyển:</h3>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p>Tên:</p>
                        <span>{order.user && order.user.username}</span>
                    </div>
                    <div>
                        <p>SĐT:</p>
                        <span>{order.shippingInfo && order.shippingInfo.phone}</span>
                    </div>
                    <div>
                    <p>Địa chỉ:</p>
                    <span>
                        {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.ward}, ${order.shippingInfo.district}, ${order.shippingInfo.city}`}
                    </span>
                    </div>
                </div>
                <h3>Hình thức thanh toán:</h3>
                <div className="orderDetailsContainerBox">
                    <p>Thanh toán khi nhận hàng</p>
                    <div>
                    <p>Thành tiền:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                </div>

                <h3>Trạng thái đơn hàng:</h3>
                <div className="orderDetailsContainerBox">
                    <div>
                    <p className={ order.orderStatus && order.orderStatus === "Đã giao hàng" ? "greenColor" : "redColor"}>
                        {order.orderStatus && order.orderStatus}
                    </p>
                    </div>
                </div>
                
            </div>

            <div className="orderDetailsCartItems">
              <h3>Sản phẩm:</h3>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems && order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.productname}
                      </Link>{" "}
                      <span>
                        {item.quantity} x {item.price}đ ={" "}
                        <b>{item.price * item.quantity}đ</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default OrderDetails
