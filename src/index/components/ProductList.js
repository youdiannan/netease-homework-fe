import { useState, useEffect } from 'react';
import ProductService from 'utils/ProductService';
import UserType from 'common/UserType';
import './css/ProductList.css';
import { useHistory } from 'react-router-dom';
import { Button, Popconfirm, message } from 'antd';

function ProductList(props) {
    let user = props.user;
    let history = useHistory();
    const [viewNotTraded, setViewNotTraded] = useState(false); // 是否只查看未交易的商品
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        ProductService.list().then(res => setProductList(res.data));
    }, [])

    function handleDelete(product) {
        // if (product.traded) {
        //     window.alert("已交易的商品暂无法删除");
        //     return;
        // }

        let productId = product.id;
        return () => {
            ProductService.delete(productId).then(() => {
                let newProductList = [];
                for (let product of productList) {
                    if (product.id !== productId) {
                        newProductList.push(product)
                    }
                }
                setProductList(newProductList);
                message.success("删除商品成功", 3)
            }).catch(err => message.error("删除失败"), 3)
        }
    }


    /**
     * 模板部分
     */
    return (
        <div className="p-container">
            <div className="tab">
                <ul>
                    <li className={"sel" + (!viewNotTraded ? " active" : "")} onClick={() => setViewNotTraded(false)}>
                        所有内容
                    </li>
                    {
                        user ?
                            <li className={"sel" + (viewNotTraded ? " active" : "")} onClick={() => setViewNotTraded(true)}>
                                {user.userType === UserType.SELLER ? '未售出的内容' : '未购买的内容'}
                            </li>
                            : ''
                    }

                </ul>
            </div>
            <div className="p-list">
                <ul>
                    {productList.map((product, index) =>
                        (
                            // 卖家展示内容有差异: 未售出内容只展示没有交易过的商品
                            !(user && user.userType === UserType.SELLER && viewNotTraded && product.traded)) ?
                            <li key={index}>
                                {/* <a href={`/product/${product.id}`}> */}
                                <a onClick={() => history.push({
                                    pathname: `/product/${product.id}`,
                                    state: { buyAble: viewNotTraded || !product.traded }
                                })} className="link">
                                    <div className="img">
                                        <img src={product.imgUrl} alt={product.name}></img>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <div className="price">
                                        <span className="unit">￥</span>
                                        <span className="value">{product.price}</span>
                                    </div>
                                    {
                                        product.traded && !viewNotTraded && user ?
                                            <span className="had">
                                                <b>{user.userType === UserType.BUYER ? "已购买" : `售出${product.tradeNum}件`}</b>
                                            </span> : ''
                                    }
                                </a>
                                {
                                    // 对于卖家，只有没有卖出的商品才能删除
                                    user && user.userType === UserType.SELLER && viewNotTraded && !product.traded ?
                                        <Popconfirm onConfirm={handleDelete(product)} title="确认删除该商品？"
                                            okText="确认" cancelText="取消"
                                        ><Button type="primary">删除</Button></Popconfirm>
                                        : null
                                }
                            </li> : null
                    )
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProductList;