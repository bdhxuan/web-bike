import React, { Fragment, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import {getProduct, clearErrors} from "../../Actions/productAction";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import {Link, useParams} from "react-router-dom"; 
import Pagination from "react-js-pagination";
import { Typography} from "@material-ui/core"
import Title from "../layout/Title";
import {getCategories} from "../../Actions/categoryAction";



const Products = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    
    
    const [category, setCategory] = useState("");


    const {products, productsCount, resultPerPage, filterProductsCount, error} = useSelector((state) => state.products);

    const { categories } = useSelector((state)=> state.categories);


    const setCurrentPageNo = (e) => {
      setCurrentPage(e);
    };

    const { keyword } = useParams();

    let count = filterProductsCount;

    useEffect(() => {
      if(error) {
        window.alert(error);
        dispatch(clearErrors())
      }

        dispatch(getProduct(keyword, currentPage, category));
    }, [dispatch, error, keyword, currentPage, category]);

    useEffect(() => {
       if(error) {
        window.alert(error);
        dispatch(clearErrors())
      }
      dispatch(getCategories());
    }, [dispatch, error])


  return (
      <Fragment>
        <Title title="Sản phẩm"></Title>
        <div className="products">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="filterBox">
          <Typography className="title">DANH MỤC SẢN PHẨM</Typography>
            <ul className="categoryBox1">
              {categories && categories.map((c) => (
                <li className="category-link" key={c.category} onClick={() => setCategory(c.category)}>
                  {c.category}
                </li>
              ))}
            </ul>
            
              <Typography className="title">LỌC SẢN PHẨM THEO</Typography>
              <ul className="categoryBox2">
                <li><Link to={"/filter/priceasc"}>Giá tăng dần</Link> </li>
                <li><Link to={"/filter/pricedesc"}> Giá giảm dần</Link> </li>
              </ul>

        </div>

        {resultPerPage < count && (
          <div className="paginationBox">
              <Pagination 
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                />
          </div>
        )}
      </Fragment>
  );
};

export default Products;
