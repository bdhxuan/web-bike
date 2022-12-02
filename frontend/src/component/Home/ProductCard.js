import React from "react";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';



const ProductCard = ({product}) => {


    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <span>
                {new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND"}).format(product.price)}
            </span>
            <p>Số lượng:
                <b className="redColor"> {product.stock}</b>
            </p>
             <p> Tình trạng:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Hết hàng" : " Còn hàng"}
                </b>
            </p>
            
            <button type="button" className="btn btn-primary">Xem chi tiết</button>
        </Link>
    );
}

export default ProductCard;