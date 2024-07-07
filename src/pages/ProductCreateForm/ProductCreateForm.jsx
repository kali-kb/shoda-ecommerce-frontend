import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setSubmittingForm } from "../../redux/productFormSlice";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import ProductForm from "../../components/ProductForm/ProductForm";
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";

function ProductCreateForm() {

  const formData = useSelector(state => state.productForm.formData);
  const selectedSizes = useSelector(state => state.productForm.selectedSizes);
  const dispatch = useDispatch();

  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};

  const navigate = useNavigate();

  const handleCreateSubmit = async(e) => {
    e.preventDefault() 
    if(formData.image && selectedSizes) {
      dispatch(setSubmittingForm(true))
    } else {
      alert("Fill out all required field")
    }
    
    const payload = {
      "title": formData.title,
      "description": formData.description,
      "img_url": formData.image,
      "available_stocks": formData.stock,
      "price": formData.price,
    }
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/merchants/${merchant.merchant_id}/products`,{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${merchant_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      console.log("success")
      navigate("/vendor/products")
      dispatch(setSubmittingForm(false))
    }
  }


  return (
    <SideBarNavBar merchant={merchant}>
      <ProductForm 
        handleSubmit={handleCreateSubmit}
        header="Create a Product"
      />
    </SideBarNavBar>
  )

}

export default ProductCreateForm;
