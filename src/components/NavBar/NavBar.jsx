import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import BagItem from '../BagItem/BagItem'
import useScreenWidth from '../../hooks/useScreenWidth'
import { Link } from 'react-router-dom'
import 'primeicons/primeicons.css';
import './navbar.css'

const UserComponent = ({screenWidth}) => {
  return (
    <div class={screenWidth == "lg" ? "user-container large" : "user-container"}>
      <img id="user-avatar" src="https://avatars.jakerunzer.com/ja" />
      <span>Yohannes Assefa</span>
    </div>
  )
}

const NavBar = () => {

  const [open, setOpen] = useState(false)
  const isMobile = useScreenWidth()
  const [visible, setVisible] = useState(false)
  const [bagItems, setBagItems] = useState([
    { id: 1, name: 'Red Running Shoes', price: 1500, quantity: 1 },
    { id: 2, name: 'Blue T-Shirt', price: 800, quantity: 2 },
    { id: 3, name: 'Black Backpack', price: 2200, quantity: 1 }
  ]); 

  const handleRemoveItem = (itemToRemove) => {
    setBagItems(bagItems.filter((item) => item !== itemToRemove)); // Filter out removed item
  };

  const mobileBagClickHandler = () => {
    setOpen(false)
    setVisible(!visible)
  }

  return (
    <>
      <nav id="navbar-shopping">
        <div class="logo-container" style={{margin: "0px"}}>
          <img height="24" width="24" src="/src/assets/shoes.png"></img>   
        </div>
        
        <div id="mid-elements">
          <div id="search-box-container">
            <span className="p-input-icon-left">
              <i className="pi pi-search" style={{paddingLeft:"10px"}} />
              <InputText placeholder="Search" />
            </span>
          </div>
          <div id="nav-menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">About</Link></li>
            </ul>
          </div>
        </div>
        <div id="right">
          <div onClick={() => setVisible(true)} class="bag-icon-container large">
             <i class="pi pi-shopping-bag" style={{ fontSize: '1.2rem' }}></i>
          </div>
          <UserComponent screenWidth="lg" />
        </div>
        <div onClick={() => setOpen(!open)} id="mobile-menu">
          {open ? <i class="pi pi-times"></i> : <i class="pi pi-bars"></i>}
        </div>
        {(open && isMobile) &&
          <div id="shopper-mobile-menu">
            <div>
              <UserComponent screenWidth="sm" />
              <div onClick={mobileBagClickHandler} class="bag-icon-container">
                <i className="pi pi-shopping-bag"></i>
              </div>
            </div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">About</Link></li>            
            </ul>
          </div>
        }
      </nav>
      <Sidebar className="w-50" visible={visible} position="right" onHide={() => setVisible(false)} >
        <h2>Bag items</h2>
        <div id='bag-items-container'>
          <div id='bag-items'>
            {bagItems.map((item) => (
              <BagItem
                key={item.id}
                item={item}
                onRemove={handleRemoveItem} // Pass the remove function
              />
            ))}
          </div>
          <div id="bottom-container">
            <div>
              <p>Subtotal</p>
              <p>ETB 25000</p>
            </div>
            <button>Checkout</button>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default NavBar;
