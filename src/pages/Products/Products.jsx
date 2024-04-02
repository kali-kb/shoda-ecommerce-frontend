import {useEffect, useState} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';

import { ProgressSpinner } from 'primereact/progressspinner';

import "./products.css"

function Products() {


  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: '1000',
      // code: 'f230fh0g3',
      item: 'Nike Air max',
      price: 65,
      sizes: "40, 41, 42, 43, 44",

      // description: 'Handcrafted Bamboo Watch with Leather Strap',
      // image: 'bamboo-watch.jpg',
      // category: 'Accessories',
      stock: 24,
      date_added: "2024-4-8"
    },
  ]);

  const [deleting, setDeleting] = useState(false)
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);


  const deleteSelected = () => {
    setDeleting(true)
    const updatedProducts = products.filter(product => !selectedProducts.includes(product));
    setProducts(updatedProducts);
    setSelectedProducts([]);
    setTimeout(() => {
      setDeleting(false)
    }, 3000)
  }


  // useEffect(() => {
  //   console.log(selectedProducts)
  // }, [selectedProducts])

  return (
    <>
      <SideBarNavBar>
        <div id="section-container">
        
          <div id="">
            {/*<h1>Products</h1>*/}
            <div id="button-container">
              <button onClick={() => navigate("/vendor/products/new")}>Add Product</button>
              {
                deleting ? 
                  <button disabled style={{ backgroundColor: "transparent", padding:0 }} onClick={deleteSelected}><ProgressSpinner style={{width: '25px', height: '25px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /></button>
                  :
                  <button id="delete-button" onClick={deleteSelected}>Delete Selected</button>
              }
            </div>
          </div>

          <div id="table-container">
            <DataTable value={products} onSelectionChange={(e) => setSelectedProducts(e.value)} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column field="item" header="Items"></Column>
              <Column field="price" sortable header="Price(ETB)"></Column>
              <Column field="stock" header="Stock"></Column>
              <Column field="sizes" header="Sizes"></Column>
              <Column field="date_added" header="Date Added"></Column>
            </DataTable>         
          </div>

        </div>

      </SideBarNavBar>
    </>
  );
}

export default Products;
