import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bagItems: [],
};

export const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const existingItem =
        state.bagItems.filter((item) => item.item_id === action.payload.item_id)
          .length > 0;
      if (existingItem) {
        existingItem.quantity += 1; // Update quantity directly on the existing object
      } else {
        console.log("added new with quantity: ", action.payload.quantity)
        state.bagItems.push({ ...action.payload, quantity: action.payload.quantity }); // Add new item
      }
    },

    increaseQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const existingItem = state.bagItems.find((item) => item.item_id === itemId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },

    removeFromBag: (state, action) => {
      console.log("action payload remove: ", action.payload);
      const updatedItem = state.bagItems.filter(
        (item) => item.item_id !== action.payload
      );
      console.log(updatedItem);
      state.bagItems = updatedItem;
    },
    clearBag: (state) => {
      state.bagItems = [];
    },
  },
});

export const { addToBag, removeFromBag, clearBag, increaseQuantity } = bagSlice.actions;

export default bagSlice.reducer;
