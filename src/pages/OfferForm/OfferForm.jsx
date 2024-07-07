import { useState, useEffect } from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import "primeicons/primeicons.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./offer-form.css";

function OfferForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discountRate, setDiscountRate] = useState(1); // Initial discount rate
  const [expiryDate, setExpiryDate] = useState(""); // Initial expiry date
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};

  //   const [ products, setProduct ] = useState([
  //     { product: "Adidas Yeezy Boost 350" },
  //     { product: "Puma Cali" },
  //     { product: "New Balance 574" },
  //     { product: "Vans Old Skool" },
  //     { product: "Converse Chuck Taylor All-Stars" },
  //     { product: "Fila Disruptor 2" },
  //     { product: "Saucony Jazz Original" },
  //     { product: "Veja Esplar" },
  //     { product: "New Balance 327" },
  //     { product: "Brooks Ghost 14" },
  //   ]);

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const isValidDiscountRate = discountRate >= 1 && discountRate <= 100;
    const hasSelectedProduct = !!selectedProduct;
    const hasExpiryDate = !!expiryDate;

    if (!isValidDiscountRate) {
      alert("Discount rate must be between 1 and 100%");
    } else if (!hasSelectedProduct) {
      alert("Please select a product.");
    } else if (!hasExpiryDate) {
      alert("Please enter an expiry date.");
    } else {
      const postData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BACKEND}/merchants/${
              merchant.merchant_id
            }/discounts`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${merchant_token}`,
              },
              body: JSON.stringify({
                discount: {
                  product_id: selectedProduct.product_id,
                  rate: discountRate,
                  expiry: expiryDate,
                },
              }),
            }
          );

          if (response.ok) {
            navigate("/vendor/offers");

          } else {
            console.error("Error creating offer:", response.status);
          }
        } catch (error) {
          console.error("Error creating offer:", error);
        }
      };

      postData();
    }


  };

  const fetchProductsForDiscount = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/merchants/${
          merchant.merchant_id
        }/products`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!merchant_token) {
      navigate("/login");
    } else {
      fetchProductsForDiscount();
    }
  }, []);

  return (
    <SideBarNavBar merchant={merchant}>
      <div id="discount-form-card">
        <h3>Create a discount offer</h3>
        <form id="form-fields" onSubmit={handleSubmit}>
          <div class="form-field">
            <label
              name="discounted-product-label"
              for="discounted-product-name"
            >
              Discounted Product
            </label>
            <Dropdown
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.value)}
              options={products}
              optionLabel="title"
              editable
              placeholder="Select a Product"
              className="w-full md:w-14rem"
            />
            {/*<input name="discounted-product-name" type="text" required />*/}
          </div>
          <div class="form-field">
            <label for="discount-rate">Discount Rate</label>
            <div id="discount-rate-field">
              <div>
                <i className="pi pi-percentage"></i>
              </div>
              <input
                name="discount-rate"
                value={discountRate}
                onChange={(e) => setDiscountRate(parseInt(e.target.value))}
                defaultValue={1}
                min="1"
                max="100"
                type="number"
                required
              />
            </div>
          </div>
          <div class="form-field">
            <label for="discount-expiry">Expiry</label>
            <input
              name="discount-expiry"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          {isSubmitting ? (
            <input
              type="submit"
              style={{ backgroundColor: "gray" }}
              value="Apply discount"
              disabled
            />
          ) : (
            <input type="submit" value="Apply discount" />
          )}
        </form>
      </div>
    </SideBarNavBar>
  );
}

export default OfferForm;
