import { useParams, useHistory } from "react-router-dom";
import ProductService from "utils/ProductService";
import CartService from "utils/CartService";
import { useState, useEffect } from "react";
import UserType from 'common/UserType';
import './css/ProductDetail.css';
import { Button, InputNumber, message, Popconfirm } from 'antd';

function ProductDetail(props) {
    let history = useHistory();
    let buyAble = history.location.state.buyAble;
    let user = props.user;
    let { productId } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [count, setCount] = useState(0); // 购买数量
    useEffect(() => {
        document.title = "商品详情";
        ProductService.getProductDetail(productId).then(res => setProductDetail(res.data));
    }, [])
    // 添加至购物车
    function handleEditCart() {
        let cartForm = {
            productId,
            ...productDetail,
            description: null,
            count: count
        }
        CartService.editCart(cartForm).then(res => message.success("添加成功"))
            .catch(err => message.error("添加失败"));
    }

    // 两个内部的子组件
    function BuyerOption() {
        return (
            <div className="option">
                {[buyAble ?
                    <Popconfirm title="确认添加至购物车？" onConfirm={handleEditCart} okText="确定" cancelText="取消"> 
                        <Button type="primary">添加至购物车</Button>
                    </Popconfirm> :
                    <Button disabled>不可购买</Button>
                    ,
                productDetail.traded ?
                    <div className="old-price" key={"old-price"}>
                        <span className="bought">已购买</span>
                        当时购买价格：
                        <ul>
                            {
                                productDetail.oldPriceList.map((price, index) =>
                                    <li key={index}>￥{price}</li>
                                )
                            }
                        </ul>
                    </div> : null
                ]}
            </div>
        )
    }

    function SellerOption() {
        return (
            <div className="option">
                <Button type="primary"><a href={`/publish/${productId}`}>编辑</a></Button>
            </div>
        )
    }

    return (
        <div className="p-detail">
            <div className="wrapper">
                <div className="img-container">
                    <img src={productDetail.imgUrl}></img>
                </div>
                <div className="cnt">
                    <h2>{productDetail.name}</h2>
                    <span className="abstract">{productDetail.productAbstract}</span>
                    <div className="price">
                        <span className="unit">￥</span>
                        <span className="value">{productDetail.price}</span>
                    </div>
                    {
                        user && user.userType === UserType.BUYER ?
                            <div className="num">
                                <span>购买数量：</span>
                                <InputNumber min={0} value={count} onChange={(v) => {
                                    setCount(v);
                                }
                                }></InputNumber>
                            </div> : null
                    }
                    <div>
                        {
                            user ? user.userType === UserType.BUYER ?
                                <BuyerOption></BuyerOption> :
                                <SellerOption></SellerOption> : ''
                        }
                    </div>
                </div>
            </div>
            <div className="full-desc">
                <div className="desc-title">
                    <h2>详细信息</h2>
                </div>
                <div className="detail"><pre>{productDetail.description}</pre></div>
            </div>
        </div>
    )
}



export default ProductDetail;