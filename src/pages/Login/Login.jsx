import { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Link, useNavigate } from "react-router-dom"
import "./login.css"


function Login() {
  
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [accountType, setAccountType] = useState("Seller")


  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };


  const merchantLogin = async (event) => {
    setIsFetching(true)
    event.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/auth/merchants/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({merchant: credentials})
    });
    console.log(response);
    const { token, errors } = await response.json();
    if (response.ok) {
      // this needs to be assigned as either shopper_token or merchant_token
      localStorage.setItem("merchant_token", token);
      setIsFetching(false)
      navigate(`/vendor`)
      } else {
      alert(errors[0]);
      setIsFetching(false)
    }
  };


  const shopperLogin = async (event) => {
    setIsFetching(true)
    event.preventDefault();
    const shopper_data = {shopper: credentials}
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/auth/shoppers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shopper_data),
      });
  
      console.log(response);
  
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setIsFetching(false)
        navigate("/shopper");
      } else {
        setIsFetching(false)
        const { errors } = await response.json();
        alert(errors[0]);
      }
    } catch (error) {
      setIsFetching(false)
      console.error("An error occurred:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };


  useEffect(() => {
    if (localStorage.getItem("merchant_token")) {
      navigate("/vendor")
    } else if(localStorage.getItem("token")) {
      navigate("/shopper")
    } else {
      void(0)
    }
  }, [])


  return (
    <div id="login-form-container">
      <h3>Login to your account</h3>
      <form onSubmit={accountType == "Seller" ? merchantLogin : shopperLogin}>
        <div class="login-field-container">
          <label>Email<b>*</b></label>
          <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="johndoe@gmail.com" required />
        </div>
        <div class="login-field-container">
          <label>Password<b>*</b></label>
          <input type="password" placeholder="abc123"name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <div class="login-field-container">
          <label>Are you?</label>
          <div id="account-type-radio-btns">
            <div className="flex align-items-center">
              <RadioButton inputId="account-type1" name="seller" value="Seller" onChange={(e) => setAccountType(e.value)} checked={accountType === 'Seller'} />
              <label htmlFor="account-type1" className="ml-2">Seller</label>
            </div>
            <div className="flex align-items-center">
              <RadioButton inputId="account-type2" name="shopper" value="Shopper" onChange={(e) => setAccountType(e.value)} checked={accountType === 'Shopper'} />
              <label htmlFor="account-type2" className="ml-2">Shopper</label>
            </div>
          </div>
        </div>
        <span id="forgot-password-link">
          <Link to="/pre-signup">Dont have an account, Sign Up?</Link>
        </span>
        <input
          className={`login-submit-btn ${isFetching ? 'submitting' : ''}`}
          type='submit'
          value={isFetching ? 'Logging in...' : 'Log in'}
          disabled={isFetching}
        />
      </form>
    </div>
  );

};

export default Login;
