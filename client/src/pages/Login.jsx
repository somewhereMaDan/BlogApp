import { React, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [_, setCookie] = useCookies(["access_Token"]);
  // const { logout } = useContext(Appcontext)
  // <button onClick={() => logout()}>logout</button>

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      setUsername("");
      setPassword("");
      setCookie("access_Token", response.data.token);
      window.localStorage.setItem("Username", response.data.username);
      window.localStorage.setItem("userID", response.data.userId);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="LoginPage">
      <div className="Login">
        <form onSubmit={handleLogin} autocomplete="off" class="form">
          <div class="control">
            <div className="SignIn_SignUp">
              <h1>Sign In</h1>
            </div>
          </div>
          <div class="control block-cube block-input">
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
            />
            <div class="bg-top">
              <div class="bg-inner"></div>
            </div>
            <div class="bg-right">
              <div class="bg-inner"></div>
            </div>
            <div class="bg">
              <div class="bg-inner"></div>
            </div>
          </div>
          <div class="control block-cube block-input">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <div class="bg-top">
              <div class="bg-inner"></div>
            </div>
            <div class="bg-right">
              <div class="bg-inner"></div>
            </div>
            <div class="bg">
              <div class="bg-inner"></div>
            </div>
          </div>
          <button class="btn block-cube block-cube-hover" type="submit">
            <div class="bg-top">
              <div class="bg-inner"></div>
            </div>
            <div class="bg-right">
              <div class="bg-inner"></div>
            </div>
            <div class="bg">
              <div class="bg-inner"></div>
            </div>
            <div class="text">Log In</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
