import {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setSubmittingForm } from "../../redux/productFormSlice";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { ProgressSpinner } from 'primereact/progressspinner';
import ProductForm from "../../components/ProductForm/ProductForm";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";




function ProductEditForm() {

  const formData = useSelector(state => state.productForm.formData);
  const selectedSizes = useSelector(state => state.productForm.selectedSizes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId }  = useParams()
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const sizes = selectedSizes.map((sizeObj) => sizeObj.size)
    if (formData.image && selectedSizes) {
      dispatch(setSubmittingForm(true));
      const payload = {
        "title": formData.title,
        "description": formData.description,
        "img_url": formData.image,
        "available_stocks": formData.stock,
        "sizes": sizes,
        "price": formData.price,
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/merchants/${merchant.merchant_id}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${merchant_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({product: payload})
      });

      if (response.ok) {
        console.log("success");
        navigate("/vendor/products");
        dispatch(setSubmittingForm(false));
      }
    } else {
      alert("Fill out all required fields");
    }
  }




  return (
    <SideBarNavBar merchant={merchant}>
      <ProductForm handleSubmit={handleEditSubmit} header="Edit a Product"/>
    </SideBarNavBar>
  )

}

export default ProductEditForm;
