import { useState, useEffect } from 'react';
import ProductService from 'utils/ProductService';
import UserType from 'common/UserType';
import './css/ProductList.css';

function ProductList(props) {
    let user = props.user;
    const [viewNotTraded, setViewNotTraded] = useState(false); // 是否只查看未交易的商品
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        ProductService.list().then(res => setProductList(res.data));
    }, [])

    function handleDelete(productId) {
        return () => {
            window.confirm("确认删除该商品？") && ProductService.delete(productId).then(() => {
                let newProductList = [];
                for (let product of productList) {
                    if (product.id !== productId) {
                        newProductList.push(product)
                    }
                }
                setProductList(newProductList);
            })
        }
    }

    return (
        <div className="p-container">
            <div className="tab">
                <ul>
                    <li className={"sel" + (!viewNotTraded ? " active" : "")} onClick={() => setViewNotTraded(false)}>所有内容</li>
                    <li className={"sel" + (viewNotTraded ? " active" : "")} onClick={() => setViewNotTraded(true)}>{user && user.userType === UserType.SELLER ? '未售出的内容' : '未购买的内容'}</li>
                </ul>
            </div>
            <div className="p-list">
                <ul>
                    {productList.filter(item => viewNotTraded ? item.traded === !viewNotTraded : true).map((product, index) =>
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
                                {product.traded && <span className="had"><b>{user && user.userType === UserType.BUYER ? "已购买" : "已售出"}</b></span>}
                            </a>
                            {user && user.userType === UserType.SELLER && viewNotTraded ? <button onClick={handleDelete(product.id)}>删除</button> : ''}
                        </li>
                    )
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ProductList;