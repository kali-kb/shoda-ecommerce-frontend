import React from 'react';
import './bag-item.css';


function BagItem({ item, onRemove }) {
  return (
    <div id="bag-item">
      <div>
        <div id="bag-item-img-container">
          <img alt="bag item image" src="https://bta.scene7.com/is/image/brownthomas/2000631028_01?$pdp_zoom$&$webp$" /> {/* Assuming you have an imageUrl property */}
        </div>
        <div id="bag-item-details">
          <p>{item.name}</p>
          <div>
            <p>Quantity: <span>{item.quantity}</span></p>
            <p>Total: <span>{item.price * item.quantity} ETB</span></p> {/* Calculate total price */}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => onRemove(item)}>
          <i style={{ color: 'red', fontSize: '10px' }} className='pi pi-minus'></i>
        </button>
      </div>
    </div>
  );
}

export default BagItem;
