import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setSubmittingForm } from "../../redux/productFormSlice";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { ProgressSpinner } from 'primereact/progressspinner';
import ProductForm from "../../components/ProductForm/ProductForm";

        




function ProductEditForm() {

  const formData = useSelector(state => state.productForm.formData);
  const selectedSizes = useSelector(state => state.productForm.selectedSizes);
  const dispatch = useDispatch();



  const handleEditSubmit = (e) => {
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
      <ProductForm handleSubmit={handleEditSubmit} header="Edit a Product"/>
    </SideBarNavBar>
  )

}

export default ProductEditForm;
