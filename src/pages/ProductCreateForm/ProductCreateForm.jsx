import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setSubmittingForm } from "../../redux/productFormSlice";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import ProductForm from "../../components/ProductForm/ProductForm";



function ProductCreateForm() {

  const formData = useSelector(state => state.productForm.formData);
  const selectedSizes = useSelector(state => state.productForm.selectedSizes);
  const dispatch = useDispatch();



  // useEffect(() => {
  //   console.log("image file: ", imageFileName)
  // }, [imageFileName])

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  // useEffect(() => {
  //   console.log(selectedSizes)
  // }, [selectedSizes])


  const handleCreateSubmit = (e) => {
    e.preventDefault() 
    console.log(formData)
    console.log("submitted")
    if(formData.image && selectedSizes) {
      dispatch(setSubmittingForm(true))
      console.log("submitted")
      console.log(formData)
      console.log(selectedSizes)  
    } else {
      alert("Fill out all required field")
    }
    //TODO: write code to send data to backend
    
    setTimeout(() => {
      dispatch(setSubmittingForm(false))
    }, 3000)

  }


  return (
    <SideBarNavBar>
      <ProductForm 
        handleSubmit={handleCreateSubmit}
        header="Create a Product"
      />
    </SideBarNavBar>
  )

}

export default ProductCreateForm;
