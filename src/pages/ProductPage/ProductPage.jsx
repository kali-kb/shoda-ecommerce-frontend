import { useState } from "react"
import NavBar from "../../components/NavBar/NavBar"
import Nudger from "../../components/Nudger/Nudger"
import BreadCrumbs from "../../components/Breadcrumb/Breadcrumb"
import "./product-page.css"


function ProductPage() {

  const [chosenSize, setChosenSize] = useState(null)

  return (
    <>
      <div id="parent">
        <NavBar />
        <section id="breadcrumb-section">
          <BreadCrumbs breadcrumbs={[{ label: 'Home' },{ label: 'Products' },{ label: 'Category' }]} />
        </section>
        <section id="product-detail-section">
          <div id="image-container">
            <img id="product-img" src="https://bta.scene7.com/is/image/brownthomas/2000631028_01?$pdp_zoom$&$webp$" />
          </div>
          <div>
            <p>Nike Air Max</p>
            <p id="seller-name">seller: <span>kalebmate</span></p>
            <p>ETB 1350</p>
            <div id="size-option-container">
              <p>Available Sizes</p>
              <div id="sizes">
                <div onClick={() => setChosenSize(41)} className={chosenSize == 41 ? "size active": "size" }>41</div>
                <div onClick={() => setChosenSize(43)} className={chosenSize == 43 ? "size active": "size" }>43</div>
                <div onClick={() => setChosenSize(44)} className={chosenSize == 44 ? "size active": "size" }>44</div>
                <div onClick={() => setChosenSize(45)} className={chosenSize == 45 ? "size active": "size" }>45</div>
              </div>
            </div>
            <div id="quantity-container">
              <p>Quantity</p>
              <Nudger />
            </div>
            <button>Add to Bag</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductPage;