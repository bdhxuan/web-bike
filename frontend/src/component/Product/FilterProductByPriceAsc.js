import React, { Fragment, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import Title from "../layout/Title";
import {getFilterPriceAsc} from "../../Actions/filterAction"
import { Typography} from "@material-ui/core";
import {getCategories} from "../../Actions/categoryAction";
import {getProduct, clearErrors} from "../../Actions/productAction";
import {Link} from "react-router-dom"; 



const FilterProductByPriceAsc = () => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState("");

    const {FilterPriceAscs, error} = useSelector(state => state.priceAsc);

    const {categories} = useSelector(state => state.categories);

  
    useEffect(() => {
      if(error) {
        window.alert(error);
        dispatch(clearErrors())
      }

        dispatch(getProduct(category));
    }, [dispatch, error,category]);

     useEffect(() => {
      dispatch(getFilterPriceAsc());
    },[dispatch])


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
          {FilterPriceAscs && FilterPriceAscs.map((FilterPriceAsc) => (
            <ProductCard key={FilterPriceAsc._id} product={FilterPriceAsc} />
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

export default FilterProductByPriceAsc;
