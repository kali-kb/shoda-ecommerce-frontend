import React from "react";
import { useState } from "react";
import "primeicons/primeicons.css";
import "./product-card.css";
import { Dialog } from "primereact/dialog";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBag,
  removeFromBag,
  clearBag,
  increaseQuantity,
} from "../../redux/bagSlice";
import { InputNumber } from "primereact/inputnumber";
import Nudger from "../Nudger/Nudger";

const ProductCard = (props) => {
  const [visible, setVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [value, setValue] = useState(50);
  const [selectedSize, setSelectedSize] = useState(null);
  const quantity = useSelector((state) => state.quantity.value);
  const dispatch = useDispatch();

  function truncateText(text, maxLength = 15, suffix = "...") {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + suffix;
  }

  const addProductToBag = async () => {
    setIsFetching(true);
    console.log(`product_id: ${props.product_id}, quantity: ${quantity}`);
    const item = { product_id: props.product_id, quantity };
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND}/bag_items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(item),
      }
    );
    if (response.ok) {
      const bag_item = await response.json();
      if (bag_item.message == "Quantity updated") {
        dispatch(
          increaseQuantity({
            itemId: bag_item.item_id,
            quantity: bag_item.quantity,
          })
        );
        setIsFetching(false);
      } else {
        dispatch(addToBag(bag_item));
        setIsFetching(false);
      }
    }
  };

  return (
    <div id="product-card">
      <div id="product-img-container">
        <img src={props.img_url} />
        {props.discount && (
          <div data-testid="discount-badge" id="discount-badge">
            <span>-{props.discount.rate}%</span>
          </div>
        )}
      </div>
      <div>
        <div>
          <span id="product-title">{truncateText(props.title)}</span>
          <span id="product-price">ETB {props.price}</span>
        </div>
        <button onClick={() => setVisible(true)} id="add-to-bag-btn">
          <i className="pi pi-shopping-bag"></i>
        </button>
      </div>
      <Dialog
        // header="Product Details"
        visible={visible}
        style={{ backgroundColor: "green", width: "70vw" }}
        onHide={() => setVisible(false)}
      >
        <div id="product-details-container">
          <div id="img-container">
            <img src={props.img_url} />
          </div>
          <div id="detail-container">
            <p>{props.title}</p>
            <p>Price: {props.price} ETB</p>
            <div id="sizes-container">
              {props.sizes.map((size, index) => {
                return (
                  <button
                    onClick={() => setSelectedSize(size)}
                    key={index}
                    style={
                      size == selectedSize
                        ? { backgroundColor: "orange", color: "#fff" }
                        : {}
                    }
                    id="size-btn"
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <Nudger limit={props.available_stocks} />
            {/* <Nudger quantity={quantity} handleClick={clickEventHandler} /> */}
            {props.available_stocks < 1 && (
              <span
                style={{
                  color: "red",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                Product is out of stock
              </span>
            )}
            <button
              onClick={addProductToBag}
              style={
                isFetching || props.available_stocks < 1
                  ? { backgroundColor: "#252525" }
                  : {}
              }
              disabled={isFetching || props.available_stocks < 1}
              id="add-to-bag"
            >
              {isFetching ? "..." : "Add to Bag"}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProductCard;
