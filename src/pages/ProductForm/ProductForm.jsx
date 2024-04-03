import {useEffect, useState} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import UploadButton from "../../components/UploadButton/UploadButton";
import { ProgressSpinner } from 'primereact/progressspinner';
import { MultiSelect } from 'primereact/multiselect';
import cloudinaryUploader from "../../../utils"
import "./product-form.css"



function ProductForm() {

  const sizes_list = [{ size: 40},{ size: 41},{ size: 42},{ size: 43},{ size: 44}]
  const [submittingImage, setSubmittingImage] = useState(false)
  const [imageFileName, setImageFileName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    price: 0,
    stock: 1,
    // sizes: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == "stock" || name=="price"){
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });  
    } else  {
        setFormData({
        ...formData,
        [name]: value,
      }); 
    }
  };

  //TODO: make sure it uploaded and returned secure_url before submitting data, disable button in the meanwhile
  const onUpload = async (event) => {
    setSubmittingImage(true)
    setImageFileName(`${event.target.files[0].name}`)
    const data = await cloudinaryUploader(event)
    console.log("data: ", data.secure_url)
    setSubmittingImage(false)
    setFormData({
      ...formData,
      image: data.secure_url
    });

    console.log(formData)
    return data.secure_url;
  };



  useEffect(() => {
    console.log("image file: ", imageFileName)
  }, [imageFileName])

  useEffect(() => {
    console.log(formData)
  }, [formData])

  useEffect(() => {
    console.log(selectedSizes)
  }, [selectedSizes])


  const handleSubmit = (e) => {
    e.preventDefault() 
    setSubmitting(true)
    console.log(formData)
    console.log("submitted")
    
    //TODO: write code to send data to backend
    
    setTimeout(() => {
      setSubmitting(false)
    }, 3000)

  }


  return (
    <SideBarNavBar>
      <div id="product-form-container">
        <h3 id="product-form-header">Create a product</h3>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
             <label for="title">Product title<span style={{color: "red", padding:0}}>*</span></label>
             <input id="title" type="text" value={formData.title} onChange={handleChange} name="title" required />
          </div>
          <div className="field-container">
             <label for="description">Product description</label>
             <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div id="img-price-container">
             <div className="field-container">
                <label for="">Product Image</label>
                <UploadButton imageName={imageFileName} onUploadEvent={onUpload}  />
             </div>
             <div className="field-container">
                <label for="price">Price(ETB)<span style={{color: "red", padding:0}}>*</span></label>
                <input type="number" value={formData.price} onChange={handleChange} name="price" required></input>
             </div>
          </div>
          <div id="img-price-container">
             <div className="field-container">
                <label for="stock">Stock Available</label>
                <input type="number"  value={formData.stock} onChange={handleChange} name="stock"></input>
             </div>
             <div className="field-container">
                <label for="sizes">Size</label>
                <MultiSelect value={selectedSizes} onChange={(e) => setSelectedSizes(e.value)} name="sizes" options={sizes_list} optionLabel="size" placeholder="Select Available Sizes" maxSelectedLabels={3} className="w-full md:w-20rem" />
             </div>
          </div>
          <div>
            {submitting ? <ProgressSpinner style={{width: '25px', height: '25px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> : submittingImage ?  <input style={{color:"#000", backgroundColor: "lightgray"}} type="submit" value="Save Product" disabled></input>: <input type="submit" value="Save Product"></input>}
          </div>
       </form>
    </div>

    </SideBarNavBar>
  )

}

export default ProductForm;
