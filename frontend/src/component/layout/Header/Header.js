/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";
import "../Header/Header.css"
import {NavLink} from "react-router-dom";
import UserOptions from "./UserOptions";
import { useSelector } from "react-redux";

const Header = ({history}) => {
  const [showIcons, setShowIcons] = useState(false);

  const [keyword, setKeyword] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const searchSubmit = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      history.push(`/products/${keyword}`); //push cho phep di toi location moi
    } else {
      history.push("/products");
    }
  };

    return (
      <Fragment>
        <nav className="main-nav">
        <div className="logo">
          <NavLink to="/"><h1>X-Bike <i className="fa-solid fa-bicycle"></i></h1></NavLink>
        </div>
        <div className= { showIcons ? "menu-link mobile-menu-link": "menu-link" }>
          <ul>
            <li>
              <NavLink to="/">Trang Chủ</NavLink>
            </li>
            <li>
              <NavLink to="/products">Sản Phẩm</NavLink>
            </li>
            <li>
              <NavLink to="/about">Tin Tức</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Liên Hệ</NavLink>
            </li>
          </ul>
        </div>
        <div className="icon">
            <ul className="icon-desktop">
                <li>
                    
                      <form className="searchBox" onSubmit={searchSubmit}>
                        <input type="search" placeholder="Tìm kiếm..."  onChange={(e) => setKeyword(e.target.value)} />
                        <NavLink to={`/products/${keyword}`}>
                          <span type="submit">
                            <i className="fas fa-search"></i>
                          </span>
                        </NavLink>
                      </form>
                    
                </li>
                <li>
                  <NavLink to="/cart"><i className="fa-solid fa-cart-plus"></i></NavLink>
                </li>
                <li>
                  {isAuthenticated && <UserOptions user={user} />}
                  <NavLink to="/login"><i className="fa-solid fa-user"></i></NavLink>
                  
                </li>
            </ul>
            <div className="menu">
                <a href="#" onClick={() => setShowIcons(!showIcons)}><i className="fa-solid fa-bars"></i></a>
            </div>
        </div>
      </nav>
      </Fragment>
    )
};

export default Header;