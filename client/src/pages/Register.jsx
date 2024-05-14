import { React, useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      toast.error("Password must be at least 12 characters long and include a combination of uppercase and lowercase letters, numbers, and symbols.");
      return;
    }
    try {
      toast.info("Registering User...");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username,
          password,
        }
      );
      setUsername("");
      setPassword("");
      toast.success(response.data.message);
    } catch (err) {
      setUsername("");
      setPassword("");
      if (err.response && err.response.status === 403) {
        toast.error("User already exists");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="RegisterPage">
      <div className="Register">
        <form onSubmit={handleRegister} autocomplete="off" className="form">
          <div className="control">
            <div className="SignIn_SignUp">
              <h1>Sign Up</h1>
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
            <div className="text">Register</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
