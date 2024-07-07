import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  formData: { title: "", description: "", image: null, price: 0, stock: 1 },
  submittingImage: false,
  submittingForm: false,
  selectedSizes: null,
  imageFileName: ""
};

export const productFormSlice = createSlice({
  name: 'productForm',
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      if (name === "stock" || name === "price") {
        state.formData[name] = parseInt(value);
      } else {
        state.formData[name] = value;
      }
    },
    startImageUpload: (state) => {
      state.submittingImage = true;
    },
    finishImageUpload: (state, action) => {
      state.submittingImage = false;
      state.formData.image = action.payload;
    },
    setSelectedSizes: (state, action) => {
      state.selectedSizes = action.payload;
    },
    setSubmittingForm: (state, action) => {
      state.submittingForm = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = action.payload
    },
    resetState: (state) => {
      state.formData = initialState.formData
      state.submittingImage = initialState.submittingImage
      state.submittingForm = initialState.submittingForm
      state.selectedSizes = initialState.selectedSizes
      state.imageFileName = initialState.imageFileName
    },

    setImageFileName: (state, action) => {
      state.imageFileName = action.payload
    }


  },
});

export const { 
  handleChange, 
  startImageUpload, 
  finishImageUpload, 
  setSelectedSizes, 
  setSubmittingForm,
  setImageFileName,
  updateFormData,
  resetState
} = productFormSlice.actions;

export default productFormSlice.reducer;
