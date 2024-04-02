import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './shopper-sign-up.css';

const ShopperSignUp = () => {
  const [shopperData, setShopperData] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const handleShopperDataChange = (event) => {
    setShopperData({ ...shopperData, [event.target.name]: event.target.value });
  };

  const handleShopperSignUp = (event) => {
    event.preventDefault(); 
    console.log('Shopper sign-up submitted:', shopperData);

    // Reset form after submission (optional)
    setShopperData({ firstName: '', email: '', password: '' });
  };

  // useEffect to log data changes on state update
  useEffect(() => {
    console.log('Shopper data updated:', shopperData);
  }, [shopperData]); // Dependency array: Runs only when shopperData changes

  return (
    <div id="shopper-signup-form-container">
      <h3>Create shopper account</h3>
      <form onSubmit={handleShopperSignUp}>
        <div className="shopper-signup-field-container">
          <label>First name<b>*</b></label>
          <input
            type="text"
            name="firstName"
            required
            value={shopperData.firstName}
            onChange={handleShopperDataChange}
          />
        </div>
        <div className="shopper-signup-field-container">
          <label>Email<b>*</b></label>
          <input
            type="email"
            name="email"
            required
            value={shopperData.email}
            onChange={handleShopperDataChange}
          />
        </div>
        <div className="shopper-signup-field-container">
          <label>Password<b>*</b></label>
          <input
            type="password"
            name="password"
            required
            value={shopperData.password}
            onChange={handleShopperDataChange}
          />
        </div>
        <span id="log-in-link">Already have an account <Link to="/login">Log in</Link></span>
        <input id="shopper-form-submit" type="submit" value="Create Account" />
      </form>
    </div>
  );
};

export default ShopperSignUp;
