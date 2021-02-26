import { useState, useEffect } from 'react';
import UserService from 'utils/UserService';
import UserType from 'common/UserType';
import { Link, useRouteMatch } from 'react-router-dom';

function Header() {
    let { path, url } = useRouteMatch();
    const [user, setUser] = useState({
        id: null,
        username: null,
        userType: null
    });
    // mount时触发
    useEffect(() => {
        UserService.getCurrentUser().then(res => setUser(res.data));
    }, [])

    function handleLogout(e) {
        e.preventDefault();
        UserService.logout().then(res => setUser({}))
    }

    if (user) {
        return (
            <div className="header">
                <div className="user">
                    {(!user.userType || user.userType == UserType.BUYER) && <span>买家你好，</span> || <span>卖家你好，</span>}
                    <span>{user.username || ''}!</span>
                    { !user.username ? <a href="/login">[登录]</a> : 
                    <a onClick={handleLogout} href="#">[退出]</a> }
                </div>
                <ul className="nav">
                    <li key="index"><a href="/">首页</a></li>
                    {
                    user.userType == UserType.BUYER ? 
                        [
                            <li key="account"><Link to="/account">账务</Link></li>,
                            <li key="cart"><Link to="/cart">购物车</Link></li>
                        ] :
                        <li key="publish"><Link to="/publish">发布</Link></li>
                    }
                    
                </ul>
            </div>
        )
    } else {
        return (
            <div className="header">
                <div className="user">
                    <span>请<a href="/login">[登录]</a></span>
                </div>
                <ul className="nav">
                    <li><a href="/">首页</a></li>
                </ul>
            </div>
        )
    }
}

export default Header;