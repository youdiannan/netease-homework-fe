import md5 from 'js-md5';
import UserService from "utils/UserService";
import { useState } from 'react';
import ResponseStatus from 'common/ResponseStatus'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let loginForm = {};
    loginForm["username"] = username;
    loginForm["password"] = md5(password).toLowerCase();
    console.log(loginForm)
    UserService.login(loginForm).then(res => {
      if (res.status == ResponseStatus.ERROR) {
        window.alert("登录失败!请检查用户名或密码")
        setPassword('')
      }
      window.location.href = '/'
    }).catch(res => {
      window.alert("未知错误");
    })
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="username">
          <span>用户:</span>
          <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)}></input>
        </div>
        <div className="password">
          <span>密码:</span>
          <input type="password" value={password} name="password" onChange={e => setPassword(e.target.value)}></input>
        </div>
        <input type="submit" value="登录"></input>
      </form>
    </div>
  );
}

export default Login;
