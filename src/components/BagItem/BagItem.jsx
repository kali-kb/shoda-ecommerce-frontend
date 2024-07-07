import React from "react";
import "./bag-item.css";
import { removeFromBag } from "../../redux/bagSlice";
import { useDispatch } from "react-redux";

function BagItem({ item }) {
  const dispatch = useDispatch();

  const deleteBagItem = async (itemId) => {
    console.log(`removing item with id ${itemId}`)
    try {
      await fetch(`${import.meta.env.VITE_API_BACKEND}/bag_items/${itemId}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      });
      dispatch(removeFromBag(itemId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="bag-item">
      <div>
        <div id="bag-item-img-container">
          <img alt="bag item image" src={item.product.img_url} />{" "}
          {/* Assuming you have an imageUrl property */}
        </div>
        <div id="bag-item-details">
          <p>{item.product.title}</p>
          <div>
            <p>
              Quantity:
              <span style={{ fontWeight: "bold" }}>{item.quantity}</span>
            </p>
            <p>
              Total:
              <span style={{ fontWeight: "bold" }}>
                {item.product.price * item.quantity} ETB
              </span>
            </p>{" "}
            {/* Calculate total price */}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => deleteBagItem(item.item_id)}>
          <i
            style={{ color: "red", fontSize: "10px" }}
            className="pi pi-minus"
          ></i>
        </button>
      </div>
    </div>
  );
}

export default BagItem;
