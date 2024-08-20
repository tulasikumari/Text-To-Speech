import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../apis/Api";
import Navbar from "../components/Navbar";
import about from "../images/about12.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    const data = { email, password };

    try {
      const res = await loginUserApi(data);
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userData));

        if (res.data.userData.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/homepage");
        }
      }
    } catch (err) {
      toast.error("Server Error");
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="box">
        <div className="login-container">
          <div className="image-container">
            <img src={about} alt="Background" />
          </div>
          <div className="form-container">
            <h2>Login Here!</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                value={email}
                required
              />
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
              <div>
                <p style={{ textAlign: "right" }}>
                  <a href="/ResetPasswordForm">Forgot Password</a>
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    borderColor: "black",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#333";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "black";
                  }}
                >
                  Login
                </button>
              </div>
            </form>
            <p style={{ textAlign: "center" }}>
              Don't have an account? <a href="/Register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
