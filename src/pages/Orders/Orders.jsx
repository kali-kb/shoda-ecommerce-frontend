import {useEffect, useState} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./orders.css"


function Orders() {
  const [products, setProducts] = useState([
    {
      id:1,
      order: "nike react",
      total_amount: 190,
      status: "Fullfilled",
      delivery_date: "2024-03-05"
    },
   {
    id:2,
     order: "New Balance Fresh Foam",
     total_amount: 150,
     status: "Unfullfilled",
     delivery_date: "2024-03-07"
   },
    {
      id:3,
     order: "Under Armour HOVR",
     total_amount: 180,
     status: "Fullfilled",
     delivery_date: "2024-03-08"
   },
   
   {
    id:4,
   order: "Puma RS-X",
   total_amount: 160,
   status: "Pending",
   delivery_date: "2024-03-06"
 },
  {
    id:5,
   order: "ASICS Gel-Kayano",
   total_amount: 200,
   status: "Fullfilled",
   delivery_date: "2024-03-09"
 },
  {
    id:6,
   order: "Reebok Nano X",
   total_amount: 170,
   status: "Fullfilled",
   delivery_date: "2024-03-11"
 },
  {
    id:7,
   order: "Saucony Kinvara",
   total_amount: 140,
   status: "Fullfilled",
   delivery_date: "2024-03-12"
 },
  {
    id:8,
   order: "Brooks Ghost",
   total_amount: 190,
   status: "Fullfilled",
   delivery_date: "2024-03-13"
 }





  ]);
  const [sizeOptions] = useState([
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' }
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);

  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts])

  const onFullfilleSelected = () => {
    // const updatedList = products.filter(product => !selectedProducts.includes(product));
    // setProducts(updatedProducts);
  }

  const statusBodyTemplate = (products) => {
    return <Tag value={products.status} severity={products.status == "Fullfilled" ? "success": products.status == "Pending" ? "warning" : "danger"} />;
  };

  return (
    <SideBarNavBar>
      <div id="section-container">
        
          <div id="">
            {/*<h1>Products</h1>*/}
            <div id="button-container">
              <button>Fullfill Selected</button>
            </div>
          </div>

          <div id="table-container">
            <DataTable value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} size={size} tableStyle={{border:"1px", minWidth: '50rem' }}>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="order" header="Order"></Column>
                <Column field="total_amount" sortable header="Total Amount(ETB)"></Column>
                <Column field="status" filter body={statusBodyTemplate} header="Status"></Column>
                <Column field="delivery_date" header="Delivery Date"></Column>
            </DataTable>
          </div>

        </div>
    </SideBarNavBar>
  )

}

export default Orders;
