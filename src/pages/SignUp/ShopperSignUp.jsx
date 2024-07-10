import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./shopper-sign-up.css";

const ShopperSignUp = () => {
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [shopperData, setShopperData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleShopperDataChange = (event) => {
    setShopperData({ ...shopperData, [event.target.name]: event.target.value });
  };

  const sendShopperData = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/auth/shoppers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ shopper: shopperData }),
        }
      );
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsFetching(false);
        navigate("/shopper");
      }

      console.log(data);
    } catch (error) {
      alert(error);
      // console.error("Error:", error);
    }
  };

  const handleShopperSignUp = () => {
    event.preventDefault();
    sendShopperData();
  };

  // useEffect to log data changes on state update
  useEffect(() => {
    console.log("Shopper data updated:", shopperData);
  }, [shopperData]); // Dependency array: Runs only when shopperData changes

  return (
    <div id="shopper-signup-form-container">
      <h3>Create shopper account</h3>
      <form onSubmit={handleShopperSignUp}>
        <div className="shopper-signup-field-container">
          <label>
            Full name<b>*</b>
          </label>
          <input
            type="text"
            name="name"
            required
            value={shopperData.firstName}
            onChange={handleShopperDataChange}
          />
        </div>
        <div className="shopper-signup-field-container">
          <label>
            Email<b>*</b>
          </label>
          <input
            type="email"
            name="email"
            required
            value={shopperData.email}
            onChange={handleShopperDataChange}
          />
        </div>
        <div className="shopper-signup-field-container">
          <label>
            Password<b>*</b>
          </label>
          <input
            type="password"
            name="password"
            required
            value={shopperData.password}
            onChange={handleShopperDataChange}
          />
        </div>
        <span id="log-in-link">
          Already have an account <Link to="/login">Log in</Link>
        </span>
        {isFetching ? (
          <input
            id="shopper-form-submit"
            type="submit"
            value="..."
            disabled={true}
          />
        ) : (
          <input
            id="shopper-form-submit"
            type="submit"
            value="Create Account"
            disabled={false}
          />
        )}
      </form>
    </div>
  );
};

export default ShopperSignUp;
