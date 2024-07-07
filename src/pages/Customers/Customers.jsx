import { useEffect, useState } from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { DataTable } from "primereact/datatable";
import { Avatar } from "primereact/avatar";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./customers.css";

function Customers() {
  const [customers, setCustomers] = useState([
 
  ]);
  const navigate = useNavigate()
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token): {};

  const customerBodyTemplate = (customers) => {
    return (
      <div id="customer-data-container">
        <Avatar
          image={`https://api.dicebear.com/8.x/initials/svg?seed=${customers.shopper.name}`}
          shape="circle"
        />
        <span>{customers.shopper.name}</span>
      </div>
    );
  };


  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND}/merchants/${
          merchant.merchant_id
        }/customers`,
        {
          headers: {
            Authorization: `Bearer ${merchant_token}`,
          },
        }
      );
      const data = await response.json();
      setCustomers(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(merchant_token){
      fetchCustomers();
    } else {
      navigate("/login")
    }
  }, []);

  return (
    <SideBarNavBar merchant={merchant}>
      <div id="section-container">
        <div id="">
          <p>
            <b>{customers.length}</b> Customers
          </p>
        </div>

        <div id="table-container">
          <DataTable
            value={customers}
            dataKey="customer_id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="shopper.name"
              body={customerBodyTemplate}
              header="Name"
            ></Column>
            <Column field="shopper.email" header="Email"></Column>
            <Column field="city" header="City"></Column>
            <Column field="postal_code" header="Postal Code"></Column>
          </DataTable>
        </div>
      </div>
    </SideBarNavBar>
  );
}

export default Customers;
