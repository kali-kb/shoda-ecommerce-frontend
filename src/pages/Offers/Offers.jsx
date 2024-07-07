import { useState, useEffect } from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import { ProgressSpinner } from "primereact/progressspinner";
import { jwtDecode } from "jwt-decode";
import "./offers.css";

function Offers() {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  const [selected, setSelected] = useState([]);
  // const [offers, setOffers] = useState([
  //   { id:2, discounted_product: "Adidas Yeezy Boost 350", discount_rate: 10, expiry: "2024-09-30" },
  //   { id:3, discounted_product: "Puma Cali", discount_rate: 7, expiry: "2024-08-15" },
  //   { id:4, discounted_product: "New Balance 574", discount_rate: 8, expiry: "2024-11-21" },
  //   { id:5, discounted_product: "Vans Old Skool", discount_rate: 3, expiry: "2024-10-05" },
  //   { id:6, discounted_product: "Converse Chuck Taylor All-Stars", discount_rate: 4, expiry: "2024-07-20" }
  // ])
  const [offers, setOffers] = useState([]);
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};

  const onCheck = (offerId) => {
    console.log(offerId);
    console.log(selected);
    if (selected.includes(offerId)) {
      const filteredSelected = selected.filter(
        (offer_id) => offer_id != offerId
      );
      setSelected(filteredSelected);
    } else {
      setSelected([...selected, offerId]);
    }
  };

  const handleCheckAll = () => {
    const newSelected = allSelect ? [] : offers.map((offer) => offer.discount_id); // Efficiently select/deselect all IDs
    setSelected(newSelected);
    setAllSelect(!allSelect); // Toggle allSelect state based on previous value
  };

  const handleOfferDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/merchants/${
          merchant.merchant_id
        }/discounts`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${merchant_token}`,
          },
          body: JSON.stringify({ discount_ids: selected }),
        }
      );
      if (response.ok) {
        const updatedOffers = offers.filter(
          (offer) => !selected.includes(offer.discount_id)
        );
        setOffers(updatedOffers);
        setSelected([]);
      } else {
        console.error("Error deleting offers");
      }
    } catch (error) {
      console.error("Error deleting offers:", error);
    } finally {
      setIsDeleting(false);
    }

    deleteOffers();

    // const updatedOffers = offers.filter((offer) => !selected.includes(offer.id) )
    // setOffers(updatedOffers)
    // setTimeout(() => {
    // setIsDeleting(false)
    // }, 4000)
  };

  const fetchDiscounts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/merchants/${
          merchant.merchant_id
        }/discounts`,
        {
          headers: {
            Authorization: `Bearer ${merchant_token}`,
          },
        }
      );
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  useEffect(() => {
    if (merchant_token) {
      console.log("exists");
      fetchDiscounts();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <SideBarNavBar merchant={merchant}>
      <h3 id="offer-heading">3 offers</h3>
      <div id="offer-container">
        <div id="">
          <div>
            <Checkbox onChange={handleCheckAll} checked={allSelect}></Checkbox>
            <p>Offers</p>
          </div>
          <div>
            <button
              onClick={() => navigate("/vendor/offers/new")}
              id="offer-create-btn"
              name="offer-create-button"
            >
              Create Offer
            </button>
            {isDeleting ? (
              <button
                style={{ backgroundColor: "transparent", padding: 0 }}
                onClick={handleOfferDelete}
                id="offer-delete-btn"
                disabled
              >
                <ProgressSpinner
                  style={{ width: "25px", height: "25px" }}
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              </button>
            ) : (
              <button onClick={handleOfferDelete} id="offer-delete-btn">
                Delete
              </button>
            )}
          </div>
        </div>
        <div id="offers-list">
          {offers.length < 1 && <p style={{margin: "20px"}}>Loading...</p>}
          {offers.map((offer) => (
            <div key={offer.discount_id} class="offer">
              <div id="offered-product-container">
                <Checkbox
                  onChange={(e) => onCheck(offer.discount_id)}
                  checked={selected.includes(offer.discount_id)}
                ></Checkbox>
                <label for="offer-selection">{offer.product.title}</label>
              </div>
              <span id="offer-rate">-{offer.rate}%</span>
              <span>{offer.days_later}</span>
            </div>
          ))}
        </div>
      </div>
    </SideBarNavBar>
  );
}

export default Offers;
