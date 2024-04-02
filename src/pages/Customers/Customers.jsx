import {useEffect, useState} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import { DataTable } from 'primereact/datatable';
import { Avatar } from 'primereact/avatar';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { ProgressSpinner } from 'primereact/progressspinner';
import "./customers.css"


function Customers() {
  
  const [customers, setCustomers] = useState([
  {
    id:1,
    name: "Abiy Tadesse",
    email: "abiy@gmail.com",
    city: "Addis Ababa",
    postal_code: 1000,
  },
  { id: 2, name: "Fana Yilma", email: "fanayilma@gmail.com", city: "Gondar", postal_code: 4600 },
  { id: 3, name: "Desta Mebratu", email: "destam@gmail.com", city: "Bahir Dar", postal_code: 5000 },
  { id: 4, name: "Selamawit Gebre", email: "selam@gmail.com", city: "Hawassa", postal_code: 1200 },
  { id: 5, name: "Mekonnen Wolde", email: "moke@gmail.com", city: "Dire Dawa", postal_code: 1400 },
  { id: 6, name: "Aster Tesfaye", email: "aster@gmail.com", city: "Mekele", postal_code: 3900 }
  ]);

  const customerBodyTemplate = (customers) => {
    return (
      <div id="customer-data-container">
        <Avatar image={`https://api.dicebear.com/8.x/initials/svg?seed=${customers.name}`} shape="circle" />
        <span>{customers.name}</span>
      </div>
    )
  }

  return (
    <SideBarNavBar>
       <div id="section-container">
        
          <div id="">
            <p><b>{customers.length}</b> Customers</p>
          </div>

          <div id="table-container">
            <DataTable value={customers}  dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" body={customerBodyTemplate} header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="city" header="City"></Column>
                <Column field="postal_code" header="Postal Code"></Column>
            </DataTable>
          </div>

        </div>
    </SideBarNavBar>
  )

}

export default Customers;
