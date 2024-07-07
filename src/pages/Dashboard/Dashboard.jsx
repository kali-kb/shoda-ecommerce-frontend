import {useState, useEffect} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import DashboardCard from "../../components/DashboardCards/DashboardCards"
import "./dashboard.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



function Dashboard() {

  // const data = [{name: 'June', uv: 400, pv: 2400, amt: 2400}, {name: 'July', uv: 200, pv: 2000, amt: 2000}, {name: 'August', uv: 500, pv: 2500, amt: 2300}]
  const [chartWidth, setChartWidth] = useState(800); // Initial width
  const [dashboardData, setDashboardData] = useState({total_products: 0, total_sales: 0, chart_data: []})
  const [merchant, setMerchant] = useState({});
  const navigate = useNavigate()

  const fetchData = async () => {
    console.log("merch data", merchant)
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/merchants/${merchant.merchant_id}/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("merchant_token")}`,
      },
    });
    if (response.ok) {
      const result = await response.json();
      setDashboardData(result);
    }
  }



  useEffect(() => {
    const merchant_token = localStorage.getItem("merchant_token");
    if(merchant_token){
      const decodedToken = jwtDecode(merchant_token);
      setMerchant(decodedToken)
    } else {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    if (Object.keys(merchant).length > 0) {
      fetchData();
    }
  }, [merchant]);

  return (
    <>
      <SideBarNavBar merchant={merchant}>
        <div id="dashboard-container">
          <div id="card-container">
            <DashboardCard type="total-sales" value={dashboardData.total_sales + " ETB"} />
            <DashboardCard type="total-products" value={dashboardData.total_products}/>
          </div>
          <div id="analytics-container">
            <p>Analytics</p>
            <div id="chart-container">
              {/*<ResponsiveContainer>*/}
                <LineChart width={chartWidth} height={200} data={dashboardData.chart_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              {/*</ResponsiveContainer>*/}
            </div>
          </div>
        </div>
      </SideBarNavBar>
    </>
  );
}

export default Dashboard;
