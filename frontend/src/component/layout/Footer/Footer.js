/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {NavLink} from "react-router-dom";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h2>THÔNG TIN LIÊN HỆ</h2>
                <hr/>
                <p>CN1: đường 3/2, phường Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ</p>
                <p>CN2: đường Lý Tự Trọng, phường An Phú, Q.Ninh Kiều, TP.Cần Thơ</p>
                <p>Hotline: <NavLink to="/">0123456789</NavLink></p>
                <p>Email: <NavLink to="/">contact@xedapthethao.vn</NavLink></p>
                <p>Hoạt động: 8h30 - 19h30 các ngày trong tuần</p>
                <NavLink to="/"><i className="fa-brands fa-facebook"></i></NavLink>
                <NavLink to="/"><i className="fa-brands fa-instagram"></i></NavLink>
                <NavLink to="/"><i className="fa-solid fa-envelope"></i></NavLink>
            </div>
            <div className="midFooter">
                <h2>XE ĐẠP THỂ THAO</h2>
                <p>Copyright &copy; 2022 B1910180</p>
            </div>
            <div className="rightFooter">
                <h2>CHÍNH SÁCH HỖ TRỢ</h2>
                <hr/>
                <p><NavLink to="/">Tư vấn</NavLink></p>
                <p><NavLink to="/">Chính sách bảo hành</NavLink></p>
                <p><NavLink to="/">Chính sách giao hàng</NavLink></p>
                <p><NavLink to="/">Chính đổi trả</NavLink></p>
                <p><NavLink to="/">Thông tin thanh toán</NavLink></p>
            </div>
        </footer>
    );
};


export default Footer;