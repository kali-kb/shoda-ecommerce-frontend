import { useEffect, useState } from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [sizeOptions] = useState([
    { label: "Small", value: "small" },
    { label: "Normal", value: "normal" },
    { label: "Large", value: "large" },
  ]);
  const [size, setSize] = useState(sizeOptions[1].value);
  const [rowClick, setRowClick] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const merchant_token = localStorage.getItem("merchant_token");
  const merchant = merchant_token ? jwtDecode(merchant_token): {};
  const navigate = useNavigate()

  useEffect(() => {
    console.log(selectedOrders);
  }, [selectedOrders]);

  const onFullfillSelected = () => {
    setIsFetching(true);
    const orderIds = selectedOrders.map((order) => order.order_id);
    const updateOrderStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND}/merchants/${
            merchant.merchant_id
          }/orders`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ order_ids: orderIds }),
          }
        );

        if (response.ok) {
          const updatedOrders = orders.map((order) => {
            if (orderIds.includes(order.order_id)) {
              return { ...order, status: "fulfilled" };
            }
            return order;
          });
          setOrders(updatedOrders);
          setSelectedOrders([]);
          setIsFetching(false);
        } else {
          console.error("Error updating order status");
        }
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };

    updateOrderStatus();
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND}/merchants/${
            merchant.merchant_id
          }/orders`
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if(merchant_token) {
      fetchOrders();
    } else {
      navigate("/login")
    }
  }, []);

  const statusBodyTemplate = (orders) => {
    return (
      <Tag
        value={orders.status}
        severity={
          orders.status == "fulfilled"
            ? "success"
            : orders.status == "pending"
            ? "warning"
            : "danger"
        }
      />
    );
  };

  return (
    <SideBarNavBar merchant={merchant}>
      <div id="section-container">
        <div id="">
          <div id="button-container">
            <button
              disabled={isFetching}
              onClick={selectedOrders.length > 0 ? onFullfillSelected : void 0}
            >
              {isFetching ? "..." : "Fulfill Selected"}
            </button>
          </div>
        </div>

        <div id="table-container">
          <DataTable
            value={orders}
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedOrders}
            onSelectionChange={(e) => setSelectedOrders(e.value)}
            dataKey="order_id"
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            size={size}
            tableStyle={{ border: "1px", minWidth: "50rem" }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column field="order_number" header="Order"></Column>
            <Column
              field="total_amount"
              sortable
              header="Total Amount(ETB)"
            ></Column>
            <Column
              field="status"
              filter
              body={statusBodyTemplate}
              header="Status"
            ></Column>
            <Column field="date_created" header="Ordered Date"></Column>
          </DataTable>
        </div>
      </div>
    </SideBarNavBar>
  );
}

export default Orders;
