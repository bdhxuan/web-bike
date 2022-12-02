/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";
import "./Home.css"
import Banner from "../layout/Banner/Banner"
import ProductCard from "./ProductCard";
import { getProduct, clearErrors} from "../../Actions/productAction";
import {getNewArrivals} from "../../Actions/filterAction"
import {getFeatureProducts} from "../../Actions/featureAction";
import {useSelector, useDispatch} from "react-redux";
import Title from "../layout/Title";
import Loader from "../layout/Loader/Loader";

const Home = () => {

    const dispatch = useDispatch();
    const {products, error, loading} = useSelector((state) => state.products);
    const { newArrivals} = useSelector((state) => state.filters);

    const {FeatureProducts} = useSelector((state) => state.features); 

    useEffect(() => {
      dispatch(getNewArrivals());
    }, [dispatch]);
    

    useEffect(() => {
      // if(error) {
      //   window.alert(error);
      //   dispatch(clearErrors())
      // }
     dispatch(getFeatureProducts());
    }, [dispatch, error]);


    return (
      // <Fragment>
      // {loading ? (
      //   <Loader />
      // ) : (
        <Fragment>
          <Title title="Trang chủ"></Title>
            <Banner/>
              <br/><br/><br/><br/><br/>
              <div className="home">
                  <h2 className='title1'>sản phẩm mới về</h2>
                  <div className="container" id="container">
                    {newArrivals && newArrivals.map((newArrival) => (
                        <ProductCard key={newArrival._id} product={newArrival}/>
                    ))}
                  </div>
                  <br/>
                  <h2 className="title1">sản phẩm nổi bật</h2>
                  <div className="container" id="container">
                    {FeatureProducts && FeatureProducts.map((FeatureProduct) => (
                      <ProductCard key={FeatureProduct._id} product={FeatureProduct} />
                    ))}
                  </div>

              </div>
          </Fragment>  
    //      )}
    // </Fragment>
    );
};

export default Home;