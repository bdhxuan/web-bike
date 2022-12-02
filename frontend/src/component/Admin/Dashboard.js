import React, {useEffect} from 'react';
import "./Dashboard.css"
import Sidebar from "./Sidebar"
import Title from '../layout/Title'
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../Actions/productAction";
import { getAllOrders } from "../../Actions/orderAction.js";
import { getAllUsers } from "../../Actions/userAction.js";
import { Link } from "react-router-dom";


const Dashboard = () => {

    const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
    

  return (
    <div className="dashboard">
      <Title title="Quản trị" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1 >Quản trị</h1>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Sản phẩm</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Đơn hàng</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
