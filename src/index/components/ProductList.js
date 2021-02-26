import { useState, useEffect } from 'react';
import ProductService from 'utils/ProductService';

function ProductList() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        ProductService.list().then(res => setProductList(res.data));
    }, [])
    return (
        <div className="p-list">
            <ul>
                { productList.map((product, index) =>
                (
                    <li key={index}>
                        <a href={`/product/${product.id}`}>
                            <div className="img">
                                <img src={product.imgUrl} alt={product.name}></img>
                            </div>
                            <h3>{product.name}</h3>
                            <div className="price">
                                <span className="unit">￥</span>
                                <span className="value">{product.price}</span>
                            </div>
                            {product.bought && <span>已购买</span>}
                        </a>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default ProductList;