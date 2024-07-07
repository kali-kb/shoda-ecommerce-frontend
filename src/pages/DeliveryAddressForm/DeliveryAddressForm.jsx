import { useEffect, useState } from "react";
import './delivery-address-form.css'

const DeliveryAddressForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    localStorage.setItem("deliveryAddress", JSON.stringify(formData));
    window.location = localStorage.getItem("checkout_url");
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div id="delivery-address-form">
      <p id="delivery-form-heading">
        Delivery Address
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-container phone-input-container">
          <label htmlFor="phone-number">Phone Number</label>
          <input
            onChange={handleChange}
            type="tel"
            name="phoneNumber"
            placeholder="09********"
            required
          />
        </div>
        <div className="input-container address-input-container">
          <label htmlFor="address">Address</label>
          <input
            onChange={handleChange}
            type="text"
            name="address"
            placeholder="Addis ababa, Ethiopia"
            required
          />
        </div>
        <div className="input-container city-input-container">
          <label htmlFor="city">City</label>
          <input onChange={handleChange} type="text" name="city" required />
        </div>
        <div className="input-container postalcode-input-container">
          <label htmlFor="postalCode">Postal Code</label>
          <input onChange={handleChange} type="text" name="postalCode" required />
        </div>
        <input id="submission-btn" type="submit" value="Proceed to Payment" disabled={isSubmitting} />
      </form>
    </div>
  );
};

export default DeliveryAddressForm;
