import { configureStore } from '@reduxjs/toolkit'
import { quantitySlice  } from "./quantityValueChanger"

export default configureStore({
  reducer: {
    quantity: quantitySlice.reducer
  }
})