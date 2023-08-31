import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, loginCustomer } from "../store/actions/index";
import SwalTimer from "../components/SwalTimer.jsx";
// import { GoogleLogin } from "react-google-login";

const LoginPageCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false); //1

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the login action
    dispatch(loginCustomer(email, password));

    // Clear form fields after successful login
    setEmail("");
    setPassword("");

    // Redirect to another page after successful login
    setTimeout(() => {
      navigate('/result');
    }, 1000);
    setIsSubmitted(true); //2
  };

  return (
    <section className="main-block">
      {isSubmitted && <SwalTimer msg={'Berhasil Login'}/>}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="listing-wrap">
              <form onSubmit={handleSubmit}>
                <div className="listing-title">
                  <h4>Login Penyewa Lahan Parkir</h4>
                  <img src="images/clip4.jpg" alt="memajukan umkm" style={{ width: "35vw" }} />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control add-listing_form"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control add-listing_form"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="btn-wrap btn-wrap2">
                      <button type="submit" className="btn btn-simple">
                        Login
                      </button>
                      <p>
                        Belum mendaftar?{" "}
                        <Link to="/regCustomer">Daftar dulu di sini</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPageCustomer;
