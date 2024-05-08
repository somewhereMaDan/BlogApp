import { React, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [_, setCookie] = useCookies(["access_Token"]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      toast.info("Logging in...");
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
      toast.success("Logged in Successfully");
      navigate("/");
    } catch (err) {
      setUsername("");
      setPassword("");
      if (err.response && err.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="LoginPage">
      <div className="Login">
        <form onSubmit={handleLogin} autocomplete="off" className="form">
          <div className="control">
            <div className="SignIn_SignUp">
              <h1>Sign In</h1>
            </div>
          </div>
          <div className="control block-cube block-input">
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
            />
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
          </div>
          <div className="control block-cube block-input">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
          </div>
          <button className="btn block-cube block-cube-hover" type="submit">
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">Log In</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
