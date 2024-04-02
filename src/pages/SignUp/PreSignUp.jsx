import {useEffect, useState} from 'react';
import { RadioButton } from 'primereact/radiobutton';
import "./pre-signup.css"
import { Link, useNavigate } from "react-router-dom"




function PreSignUp() {
  
  const [account, setAccount] = useState('');

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(account == "Seller") {
      navigate("/vendor/signup")
    } else {
      navigate("/shopper/signup")
    }
  }

  return (
     <div class="question-card">
      <h3 id="question">Are you?</h3>
      <form id="presignup-form" onSubmit={handleSubmit}>
        <div id="radio-buttons">
          <div className="radio-btn-container">
            <RadioButton inputId="account1" name="pizza" value="Seller" onChange={(e) => setAccount(e.value)} checked={account === 'Seller'} />
            <label htmlFor="account1" className="ml-2">Seller</label>
          </div>
          <div className="radio-btn-container">
            <RadioButton inputId="account2" name="pizza" value="Shopper" onChange={(e) => setAccount(e.value)} checked={account === 'Shopper'} />
            <label htmlFor="account2" className="ml-2">Shopper</label>
          </div>
        </div>
        <input id="presignup-continue-btn" type="submit" value="Continue"></input>
      </form>
    </div>
  );


}

export default PreSignUp;
