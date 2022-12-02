import React, { Fragment, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import Title from "../layout/Title";
import {getFilterPriceDesc} from "../../Actions/filterAction"
import { Typography} from "@material-ui/core";
import {getCategories} from "../../Actions/categoryAction";
import {getProduct, clearErrors} from "../../Actions/productAction";
import {Link} from "react-router-dom"; 


const FilterProductByPriceDesc = () => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState("");


    const {FilterPriceDescs, error} = useSelector(state => state.priceDesc);

    const {categories} = useSelector(state => state.categories);

    useEffect(() => {
      dispatch(getFilterPriceDesc());
    },[dispatch])

    useEffect(() => {
        dispatch(getProduct(category));
    }, [dispatch, category]);

    useEffect(() => {
       if(error) {
        window.alert(error);
        dispatch(clearErrors())
      }
      dispatch(getCategories());
    }, [dispatch, error])


  return (
    <Fragment>
        <Title title="Lọc sản phẩm theo giá tăng dần"></Title>
        <div className="products">
          {FilterPriceDescs && FilterPriceDescs.map((FilterPriceDesc) => (
            <ProductCard key={FilterPriceDesc._id} product={FilterPriceDesc} />
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
    </Fragment>
  )
}

export default FilterProductByPriceDesc;
