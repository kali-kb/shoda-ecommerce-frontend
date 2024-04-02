import { useState, useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { Link, useNavigate } from "react-router-dom"
import "./login.css"


function Login() {
  
  const navigate = useNavigate()
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform login logic here using credentials.email and credentials.password
    console.log("Submitting login with:", credentials, accountType);

    // Example placeholder for a successful login:
    // alert("Login successful!");

    // Clear form fields after successful login (optional):
    // setCredentials({ email: "", password: "" });
  };

  useEffect(() => {
    console.log(credentials)
  }, [credentials])



  return (
    <div id="login-form-container">
      <h3>Login to your accout</h3>
      <form onSubmit={handleSubmit}>
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
        <input id="login-submit-btn" type="submit" value="Log in" />
      </form>
    </div>
  );

};

export default Login;
