import React from 'react';
import { useState } from 'react';
import 'primeicons/primeicons.css';
import './product-card.css'
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import Nudger from "../Nudger/Nudger"
 

const ProductCard = () => {

  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(50);
  const [quantity, setQuantity] = useState(1)


  const addToBag = () => {
    console.log("added to bag")
  }

  const clickEventHandler = (event) => {
    if(event.target.name == "add") {
      setQuantity(quantity + 1) 
    }
    else{
      if(quantity > 1) {
        setQuantity(quantity - 1)
      }
    }
  }

  return (
    <div id="product-card">
      <div id="product-img-container">
        <img src="https://bta.scene7.com/is/image/brownthomas/2000631028_01?$pdp_zoom$&$webp$" />
        <div id="discount-badge">
          <span>-30%</span>
        </div>
      </div>
      <div>
        <div>
          <span id="product-title">Nike Air</span>
          <span id="product-price">ETB 1500</span>
        </div>
        <button onClick={() => setVisible(true)} id="add-to-bag-btn">
          <i className='pi pi-shopping-bag'></i>
        </button>
      </div>
      <Dialog header="Product Details" visible={visible} style={{backgroundColor: "green", width: '90vw' }} onHide={() => setVisible(false)}>
        <div id="product-details-container">
          <div id="img-container">
            <img src="https://bta.scene7.com/is/image/brownthomas/2000631028_01?$pdp_zoom$&$webp$" />
          </div>
          <div id="detail-container">
            <p>Nike Air Max</p>
            <p>Price: 1350 ETB</p>
            <Nudger quantity={quantity} handleClick={clickEventHandler} />
            <button onClick={addToBag} id="add-to-bag">Add to bag</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCard;
