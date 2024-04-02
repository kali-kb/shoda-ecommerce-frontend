import {useState, useEffect} from "react";
import SideBarNavBar from "../../components/SideBarNavBar/SideBarNavBar"
import DashboardCard from "../../components/DashboardCards/DashboardCards"
import "./dashboard.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from "recharts";



function Dashboard() {

  const data = [{name: 'June', uv: 400, pv: 2400, amt: 2400}, {name: 'July', uv: 200, pv: 2000, amt: 2000}, {name: 'August', uv: 500, pv: 2500, amt: 2300}]
  const [chartWidth, setChartWidth] = useState(800); // Initial width


  
  return (
    <>
      <SideBarNavBar>
        <div id="dashboard-container">
          <div id="card-container">
            <DashboardCard type="total-sales" value={9000 + " ETB"} />
            <DashboardCard type="total-products" value={76}/>
          </div>
          <div id="analytics-container">
            <p>Analytics</p>
            <div id="chart-container">
              {/*<ResponsiveContainer>*/}
                <LineChart width={chartWidth} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
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
