import {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from "../../assets/icons/DashboardIcon";
import PriceTagIcon from "../../assets/icons/PriceTagIcon";
import ShoppingBagIcon from "../../assets/icons/ShoppingBagIcon";
import { useLocation } from 'react-router-dom';
import CustomerIcon from "../../assets/icons/CustomerIcon";
import GiftIcon from "../../assets/icons/GiftIcon";
import SettingsIcon from "../../assets/icons/SettingsIcon";
import useScreenWidth from "../../hooks/useScreenWidth"; 
import 'primeicons/primeicons.css';
import "./sidebar-navbar.css"


const MenuItems = ({screenSize}) => {

  const location = useLocation();
  const pathname = location.pathname;

  const setClassName = (route) => {
    if(pathname == route) {
      return "sidebar-item active"
    } else {
      return "sidebar-item"
    }
  } 

  return (
    <div style={{paddingTop: screenSize == "small" ? "0px" : "50px"}} className="sidebar-items">
      <Link className="app-links" to="/vendor">
        <div className={setClassName("/vendor")}>
          <DashboardIcon />
          <p>Dashboard</p>
        </div>
      </Link>
      <Link to="/vendor/products" className="app-links">
        <div className={setClassName("/vendor/products")}>
          <PriceTagIcon />
          <p>Products</p>
        </div>
      </Link>
      <Link to="/vendor/orders" className="app-links">
        <div className={setClassName("/vendor/orders")}>
          <ShoppingBagIcon />
          <p>Orders</p>
        </div>
      </Link>
      <Link to="/vendor/customers" className="app-links">
        <div className={setClassName("/vendor/customers")}>
          <CustomerIcon />
          <p>Customers</p>
        </div>
      </Link>
      <Link  className="app-links" to="/vendor/offers">
        <div className={setClassName("/vendor/offers")}>
          <GiftIcon />
          <p>Offers</p>
        </div>
      </Link>
      <Link to="/vendor/settings" className="app-links">
        <div className={setClassName("/vendor/settings")}>
          <SettingsIcon />
          <p>Settings</p>
        </div>
      </Link>
    </div>
  )
}


function SideBarNavBar({children, merchant }) {


  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const isMobile = useScreenWidth();
  
  const openMenu = () => { setOpen(!open) }


  const logoutHandler = () => {
    localStorage.removeItem("merchant_token")
    navigate("/login")
  }

  return (
    <>
      <div className="sidebar">
        <div className="logo-container">
          <img height="24" width="24" alt="shoda logo" src="/src/assets/shoes.png"></img>
        </div>
        <MenuItems screenSize="large"/>
      </div>

      <section>
        <nav id="navbar-vendor">
          <p>Dashboard</p>
          <div id="nav-item-right">
            <div onClick={openMenu} id="menu-icon-container">
            {open ? <i className="pi pi-times"></i> :<i className="pi pi-bars"></i>}
            </div>
            {(open && isMobile) &&
              <div style={{display: "block" , backgroundColor:"white"}} id="menu">
                <div>
                  <div>
                    <div id="mobile-user-container">
                      <img
                        height="20"
                        width="20"
                        src={"https://avatars.jakerunzer.com/" + merchant.name}
                      />
                      <span>{merchant.name}</span>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <MenuItems screenSize="small" />
                  </div>
                  <Link to="/vendor/notifications">
                    <div className="app-links" id="mobile-notification-container">
                      <i className="pi pi-bell" style={{padding:"10px"}}></i><p>Notification</p>
                    </div>
                  </Link>
                  <button onClick={() => navigate("/login")} class="logout-btn sm">Log out</button>
                </div>
              </div>
            }
            <Link className="app-links" to="/vendor/notifications">
              <div id="notification-container">
                <i className="pi pi-bell" style={{fontSize: "20px"}}></i>
              </div>
            </Link>
            <div id="user-container">
              <img
                height="20"
                width="20"
                src={"https://avatars.jakerunzer.com/" + merchant.name}
              />
              <span>{merchant.name}</span>
            </div>
            <button onClick={logoutHandler} class="logout-btn lg">Log out</button>
          </div>
        </nav>
        {children}
      </section>
    </>
  );
}

export default SideBarNavBar;
