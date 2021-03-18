import AccountService from 'utils/AccountService';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './css/Account.css';
import { List } from 'antd';


function Account(props) {
    let user = props.user;
    const [accountData, setAccountData] = useState([]);
    useEffect(() => {
        document.title = "账户";
        AccountService.list().then(res => setAccountData(res.data));
    }, []);
    let accountItems = accountData.map((item, index) => <AccountItem key={index} item={item} />)
    return (
        <div className="account">
            <div className="a-head">
                <h2>已购买的商品</h2>
            </div>
            <List dataSource={accountData} renderItem={(item, index) => <AccountItem key={index} item={item} />} />
            <div className="total-price">
                <span>总金额：<span className="unit">￥</span><span className="value">{(accountData.reduce((a, b) => a + b.totalAmount, 0)).toFixed(2)}</span></span>
            </div>
        </div>
    )
}

function AccountItem(props) {
    let item = props.item;
    let history = useHistory();
    return (
        <li className="item">
            {/* 商品图片 */}
            <img src={item.imgUrl} className="p-img" onClick={() => history.push({
                pathname: `/product/${item.productId}`,
                state: { buyAble: false }
            })} />
            <div className="p-container">
                {/* 商品名 */}
                <h4>{item.productName}</h4>
                <span className="abstract">{item.productAbstract}</span>
                <span className="price">单价:<span className="unit">￥</span><span className="value">{item.price}</span></span>
                <span className="p-cnt">数量：</span>{item.count}<br />
                <span className="trans-time">购买时间：</span>{item.transTime}
            </div>
        </li>
    )
}

export default Account;