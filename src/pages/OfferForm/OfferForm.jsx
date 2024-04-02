import { useState } from "react"
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primeicons/primeicons.css';
import "./offer-form.css"


function OfferForm() {
 	const [isSubmitting, setIsSubmitting] = useState(false)
 	const [selectedProduct, setSelectedProduct] = useState(null);
 	const [discountRate, setDiscountRate] = useState(1); // Initial discount rate
	const [expiryDate, setExpiryDate] = useState(""); // Initial expiry date

	
	const products = [
	  { product: "Adidas Yeezy Boost 350" },
	  { product: "Puma Cali" },
	  { product: "New Balance 574" },
	  { product: "Vans Old Skool" },
	  { product: "Converse Chuck Taylor All-Stars" },
	  { product: "Fila Disruptor 2" },
	  { product: "Saucony Jazz Original" },
	  { product: "Veja Esplar" },
	  { product: "New Balance 327" },
	  { product: "Brooks Ghost 14" },
	];


	const handleSubmit = (event) => {
		setIsSubmitting(true)
	    event.preventDefault(); // Prevent default form submission behavior

	    // Form validation (optional)
	    if (discountRate < 1 || discountRate > 100) {
	      alert("Discount rate must be between 1 and 100%");
	      return;
	    }


		if (!selectedProduct) {
			alert("Please select a product.");
		    return;
		}



	    if (!expiryDate) {
	      alert("Please enter an expiry date.");
	      return;
	    }

	    // Handle form submission logic here
	    console.log("Submitted offer:", {
	      product: selectedProduct,
	      discountRate,
	      expiryDate,
	    });

	    // You can make an API call to submit the offer data
	    // fetch('your-api-endpoint', {
	    //   method: 'POST',
	    //   body: JSON.stringify({ product: selectedProduct, discountRate, expiryDate }),
	    // })
	    // .then(response => {
	    //   // Handle successful submission (e.g., clear form, show success message)
	    // })
	    // .catch(error => {
	    //   // Handle submission errors (e.g., show error message)
	    // });

	    // Reset the form (optional)
	    setSelectedProduct(null);
	    setDiscountRate(1);
	    setExpiryDate("");

	    setTimeout(() => {
	    	setIsSubmitting(false)
	    }, 3000)
	  };

	return (
	  	<SideBarNavBar>
			<div id="discount-form-card">
			  <h3>Create a discount offer</h3>
			  <form id="form-fields" onSubmit={handleSubmit}>
			    <div class="form-field">
			      <label name="discounted-product-label" for="discounted-product-name">Discounted Product</label>
			      <Dropdown value={selectedProduct} onChange={(e) => setSelectedProduct(e.value)} options={products} optionLabel="product" editable placeholder="Select a Product" className="w-full md:w-14rem" />
			      {/*<input name="discounted-product-name" type="text" required />*/}
			    </div>
			    <div class="form-field">
			      <label for="discount-rate">Discount Rate</label>
			      <div id="discount-rate-field">
			        <div>
			        	<i className="pi pi-percentage"></i>
			        </div>
			        <input name="discount-rate" value={discountRate} onChange={(e) => setDiscountRate(parseInt(e.target.value))} defaultValue={1} min="1" max="100" type="number" required />
			      </div>
			    </div>
			    <div class="form-field">
			      <label for="discount-expiry">Expiry</label>
			      <input name="discount-expiry" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required/>
			    </div>
			    {isSubmitting ? <input type="submit" style={{backgroundColor:"gray"}} value="Apply discount" disabled/> : <input type="submit" value="Apply discount"/>}
			  </form>
			</div>   
		</SideBarNavBar>
	);
}

export default OfferForm

