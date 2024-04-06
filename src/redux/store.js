import { configureStore } from '@reduxjs/toolkit'
import { quantitySlice } from "./quantityValueChanger"
import { productFormSlice } from './productFormSlice'; 


export default configureStore({
  reducer: {
    quantity: quantitySlice.reducer,
    productForm: productFormSlice.reducer,
  }
})