import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { useNavigate } from "react-router-dom";
import BagItem from "../BagItem/BagItem";
import useScreenWidth from "../../hooks/useScreenWidth";
import { Link } from "react-router-dom";
import "primeicons/primeicons.css";
import "./navbar.css";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const UserComponent = ({ screenWidth, user }) => {
  return (
    <div
      class={screenWidth == "lg" ? "user-container large" : "user-container"}
    >
      <img id="user-avatar" src={`https://avatars.jakerunzer.com/${user}`} />
      <span>{user}</span>
    </div>
  );
};

const NavBar = ({ user, logoutHandler, performSearch }) => {
  const [open, setOpen] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useScreenWidth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const bagItems = useSelector((state) => state.bag.bagItems); // Access bag items from bag slice

  // initial list of bag items
  //change checkout static data
  // const [bagItems, setBagItems] = useState([
  //   { id: 1, name: 'Red Running Shoes', price: 1500, quantity: 1 },
  //   { id: 2, name: 'Blue T-Shirt', price: 800, quantity: 2 },
  //   { id: 3, name: 'Black Backpack', price: 2200, quantity: 1 }
  // ]);

  const calculateTotalPrice = () => {
    let total = 0;
    bagItems.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  };

  const handleSearchInput = (e) => {
    setQueryString(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior of submitting a form
      performSearch(queryString);
    }
  };

  const fetchCheckoutData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate(`/login`);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/checkout`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}. Network response was not ok.`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("checkout: ", result.data.checkout_url);
      if (result.data) {
        const checkout_url = result.data.checkout_url;
        localStorage.setItem("checkout_url", checkout_url);
        navigate(`/shopper/delivery-address-form`);
        // window.location = checkout_url
      }
      return result;
    } catch (error) {
      console.error("Fetch checkout data failed:", error);
      throw error; // Re-throw the error after logging it
    } finally {
      setIsLoading(false);
    }
  };

  const mobileBagClickHandler = () => {
    setOpen(false);
    setVisible(!visible);
  };

  return (
    <>
      <nav id="navbar-shopping">
        <div class="logo-container" style={{ margin: "0px" }}>
          <img height="24" width="24" src="/src/assets/shoes.png"></img>
        </div>

        <div id="mid-elements">
          <div id="search-box-container">
            <span className="p-input-icon-left">
              <i className="pi pi-search" style={{ paddingLeft: "10px" }} />
              <InputText
                onChange={(e) => handleSearchInput(e)}
                onKeyDown={handleKeyDown}
                placeholder="Search"
              />
            </span>
          </div>
          <div id="nav-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div id="right">
          <div
            onClick={() => setVisible(true)}
            class="bag-icon-container large"
          >
            <i class="pi pi-shopping-bag" style={{ fontSize: "1.2rem" }}></i>
            {/* <span id="item-count-badge"></span> */}
          </div>
          <UserComponent screenWidth="lg" user={user} />
          <button id="logout-btn" onClick={() => logoutHandler()}>
            Log out
          </button>
        </div>
        <div onClick={() => setOpen(!open)} id="mobile-menu">
          {open ? <i class="pi pi-times"></i> : <i class="pi pi-bars"></i>}
        </div>
        {open && isMobile && (
          <div id="shopper-mobile-menu">
            <div>
              <UserComponent screenWidth="sm" />
              <div onClick={mobileBagClickHandler} class="bag-icon-container">
                <i className="pi pi-shopping-bag"></i>
              </div>
              <button id="logout-btn" onClick={() => navigate("/login")}>
                Log out
              </button>
            </div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <Sidebar
        className="w-50"
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <h2>Bag items</h2>
        <div id="bag-items-container">
          <div id="bag-items">
            {bagItems.map((item) => (
              <BagItem key={item.item_id} item={item} />
            ))}
          </div>
          <div className="bottom-container">
            <div>
              <p>Subtotal</p>
              <p>ETB {calculateTotalPrice()}</p>
            </div>
            <button
              style={{ backgroundColor: bagItems.length < 1 ? "gray" : "#000" }}
              onClick={fetchCheckoutData}
              disabled={isLoading || bagItems.length < 1}
            >
              {isLoading ? "..." : "Checkout"}
            </button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default NavBar;
