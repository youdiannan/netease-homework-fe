import AccountService from 'utils/AccountService';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './css/Account.css';


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
            <ul>
                {accountItems}
            </ul>
        </div>
    )
}

function AccountItem(props) {
    let item = props.item;
    let history = useHistory();
    return (
        <li className="item"  onClick={() => history.push({
            pathname: `/product/${item.productId}`,
            state: { buyAble: false }
        })}>
            {/* 商品图片 */}
            <img src={item.imgUrl} className="p-img"></img>
            <div className="p-container">
                {/* 商品名 */}
                <h4>{item.productName}</h4>
                <span className="abstract">{item.productAbstract}</span>
                <span className="price">单价: {item.price}</span>
                <div className="p-cnt">
                    <span>数量：{item.count}</span>
                </div>
                <span className="trans-time">购买时间：{item.transTime}</span>
            </div>
        </li>
    )
}

export default Account;