import { useEffect, useState } from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch } from "react-redux";
import { updateFormData, resetState } from "../../redux/productFormSlice";
import "./products.css";
import { useQuery } from "@tanstack/react-query";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [deleting, setDeleting] = useState(false);
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token) : {};

  const fetchMerchantProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND}/merchants/${
        merchant.merchant_id
      }/products`,
      {
        headers: {
          Authorization: `Bearer ${merchant_token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      if (Array.isArray(data)) {
        const productsWithSizesAsString = data.map((product) => ({
          ...product,
          sizes: product.sizes.join(","),
        }));
        setProducts(productsWithSizesAsString);
      } else {
        const productWithSizesAsString = {
          ...data,
          sizes: data.sizes.join(","),
        };
        setProducts([productWithSizesAsString]);
      }
    }
  };

  const deleteSelected = async () => {
    setDeleting(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND}/merchants/${
        merchant.merchant_id
      }/products/${products[0].product_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("merchant_token"),
        },
      }
    );

    if (response.ok) {
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product)
      );
      setProducts(updatedProducts);
      setDeleting(false);
      setSelectedProducts([]);
    }
  };

  const addNewProduct = () => {
    dispatch(resetState());
    navigate("/vendor/products/new");
  };

  const editProduct = () => {
    const selectedProduct = selectedProducts[0];
    dispatch(
      updateFormData({
        title: selectedProduct.title,
        description: selectedProduct.description,
        image: selectedProduct.image,
        price: selectedProduct.price,
        stock: selectedProduct.available_stocks,
        sizes: selectedProduct.sizes.split(","),
      })
    );
    navigate(`/vendor/products/${selectedProduct.product_id}/edit`);
    // navigate(`/vendor/products/${selectedProducts[0].product_id}/edit`)
  };

  const deleteMultiple = async () => {
    setDeleting(true);
    const productIds = selectedProducts.map((product) => product.product_id);
    const response = await fetch(
      `${import.meta.env.VITE_API_BACKEND}/merchants/${
        merchant.merchant_id
      }/products/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${merchant_token}`,
        },
        body: JSON.stringify({ product_ids: productIds }),
      }
    );

    if (response.ok) {
      const updatedProducts = products.filter(
        (product) =>
          !selectedProducts.some(
            (selectedProduct) =>
              selectedProduct.product_id === product.product_id
          )
      );
      setProducts(updatedProducts);
      setDeleting(false);
      setSelectedProducts([]);
    }
  };

  const allowEdit = (rowData) => {
    return rowData.name !== "Blue Band";
  };

  const isSingleSelected = () => {
    if (selectedProducts) {
      return selectedProducts.length === 1;
    }
    return false;
  };

  const canEdit = isSingleSelected(); // Call the function here

  useEffect(() => {
    if (merchant_token) {
      fetchMerchantProducts();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <SideBarNavBar merchant={merchant}>
        <div id="section-container">
          <div id="">
            {/*<h1>Products</h1>*/}
            <div id="button-container">
              <button onClick={() => addNewProduct()}>Add Product</button>
              {deleting ? (
                <button
                  disabled
                  style={{ backgroundColor: "transparent", padding: 0 }}
                >
                  <ProgressSpinner
                    style={{ width: "25px", height: "25px" }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                </button>
              ) : (
                <button
                  id="delete-button"
                  onClick={
                    selectedProducts.length > 1
                      ? deleteMultiple
                      : deleteSelected
                  }
                  disabled={selectedProducts.length === 0}
                >
                  Delete Selected
                </button>
              )}
              {canEdit && <button onClick={() => editProduct()}>Edit</button>}
            </div>
          </div>

          <div id="table-container">
            <DataTable
              value={products}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              // onSelectionChange={(e) => setProduct(e)}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 25, 50]}
              selectionMode={rowClick ? null : "checkbox"}
              selection={selectedProducts}
              dataKey="product_id"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column field="title" header="Items"></Column>
              <Column field="price" sortable header="Price(ETB)"></Column>
              <Column field="available_stocks" header="Stock"></Column>
              <Column field="sizes" header="Sizes"></Column>
              <Column field="created_at" header="Date Added"></Column>
            </DataTable>
          </div>
        </div>
      </SideBarNavBar>
    </>
  );
}

export default Products;
