import UploadButton from "../../components/UploadButton/UploadButton";
import { useSelector, useDispatch } from 'react-redux'
import { handleChange ,setSelectedSizes, setImageFileName, startImageUpload, finishImageUpload} from '../../redux/productFormSlice'
import { ProgressSpinner } from 'primereact/progressspinner';
import { MultiSelect } from 'primereact/multiselect';
import cloudinaryUploader from "../../../utils";
import "./product-form.css"

function ProductForm({ handleSubmit, ...otherProps }) {

  const sizes_list = [{ size: 40},{ size: 41},{ size: 42},{ size: 43},{ size: 44}]
  const formData = useSelector(state => state.productForm.formData);
  const selectedSizes = useSelector(state => state.productForm.selectedSizes);
  const imageFileName = useSelector(state => state.productForm.imageFileName);
  const submittingImage = useSelector(state => state.productForm.submittingImage);
  const submittingForm = useSelector(state => state.productForm.submittingForm);
  const dispatch = useDispatch();


  const handleInputChange = (e) => {
    console.log("event object: ", e)
    console.log("value changed")
    const { name, value } = e.target;
    dispatch(handleChange({ name, value })); // Dispatch handleInputChange action
  };


  const uploadImage = async (e) => {
    const selectedImageName = `${e.target.files[0].name}`
    dispatch(setImageFileName(selectedImageName))
    dispatch(startImageUpload(true))
    const data = await cloudinaryUploader(e);
    dispatch(finishImageUpload(data.secure_url))
    console.log("image data: ", data.secure_url);
  }



  return (
    <>
      <div id="product-form-container">
        <h3 id="product-form-header">{otherProps.header}</h3>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
             <label for="title">Product title<span style={{color: "red", padding:0}}>*</span></label>
             <input id="title" type="text" value={formData.title} onChange={(e) => handleInputChange(e)} name="title" required />
          </div>
          <div className="field-container">
             <label for="description">Product description</label>
             <textarea id="description" name="description" value={formData.description} onChange={handleInputChange}></textarea>
          </div>
          <div id="img-price-container">
             <div className="field-container">
                <label for="">Product Image</label>
                <UploadButton imageName={imageFileName} onUploadEvent={(e) => uploadImage(e)}  />
             </div>
             <div className="field-container">
                <label for="price">Price(ETB)<span style={{color: "red", padding:0}}>*</span></label>
                <input type="number" value={formData.price} onChange={handleInputChange} name="price" required></input>
             </div>
          </div>
          <div id="img-price-container">
             <div className="field-container">
                <label for="stock">Stock Available</label>
                <input type="number"  value={formData.stock} onChange={handleInputChange} name="stock"></input>
             </div>
             <div className="field-container">
                <label for="sizes">Size</label>
                <MultiSelect value={selectedSizes} onChange={(e) => dispatch(setSelectedSizes(e.value))} name="sizes" options={sizes_list} optionLabel="size" placeholder="Select Available Sizes" maxSelectedLabels={3} className="w-full md:w-20rem" />
             </div>
          </div>
          <div>
            {submittingForm ? <ProgressSpinner style={{width: '25px', height: '25px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> : submittingImage ?  <input style={{color:"#000", backgroundColor: "lightgray"}} type="submit" value="Save Product" disabled></input>: <input type="submit" value="Save Product"></input>}
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductForm