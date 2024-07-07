

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  merchantInfo: null
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
    setMerchantInfo: (state, action) => {
      state.merchantInfo = action.payload;
    }
  }
});

export const { setMerchantInfo } = merchantSlice.actions;
export default merchantSlice.reducer;
