const DashboardCard = ({type, value}) => {
  // The SVG code for the money icon
  const moneyIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)", transform:"", msFilter:""}}><path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 11a3 3 0 0 0-3 3H7a3 3 0 0 0-3-3V9a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v6z"></path><path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z"></path></svg>;
  const priceTagIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{fill: "rgba(255, 255, 255, 1)", transform:"", msFilter: ""}}><path d="M13.707 3.293A.996.996 0 0 0 13 3H4a1 1 0 0 0-1 1v9c0 .266.105.52.293.707l8 8a.997.997 0 0 0 1.414 0l9-9a.999.999 0 0 0 0-1.414l-8-8zM12 19.586l-7-7V5h7.586l7 7L12 19.586z"></path><circle cx="8.496" cy="8.495" r="1.505"></circle></svg>

  // The JSX code for the component
  return (
    <div className="total-sales-container">
      <div className="total-sales-title">{type == "total-sales" ? "Total Sales" : "Total products" }</div>
      <div className="total-sales-content">
        <div style={{backgroundColor: type == "total-sales" ? '#1AB10D': '#F57C00'}} className="money-icon">{type == "total-sales" ? moneyIcon: priceTagIcon}</div>
        <div className="money-value">{value}</div>
      </div>
    </div>
  );
};

export default DashboardCard;