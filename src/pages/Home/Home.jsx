
// src/pages/Home/Home.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar";
import ProductCard from '../../components/ProductCard/ProductCard';
import { addToBag } from '../../redux/bagSlice';
import "./home.css";


// const API_BACKEND = "http://172.28.89.83:3001"

function Home() {

  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [bagItems, setBagItems] = useState([])
  const [queryString, setQueryString] = useState(null)
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/products`, {
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("products", data)
    return data;
  };

  const fetchBagItemsAndUpdateStore = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/bag_items`, {
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const bagItems = await response.json();
      console.log("bgitems:", bagItems)
      console.log("count: ", bagItems.length)
      bagItems.forEach(item => {
        dispatch(addToBag(item));
      }); 
    } catch (error) {
      console.error('Error fetching bag items:', error);
    }
  };
 
  const fetchProductsWithQuery = async (queryString) => {
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/products?query=${queryString}`, {
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  };
  
  const { isLoading, error, data: products } = useQuery({
    queryKey: ['products', queryString],
    queryFn: () => queryString ? fetchProductsWithQuery(queryString) : fetchProducts(),
    keepPreviousData: true
  });
      
  const search = (queryString) => {
    setQueryString(queryString)
    fetchProductsWithQuery(queryString)
  }


  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }


  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    } else {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken)
      fetchBagItemsAndUpdateStore();
    }
  }, [])

  
  return (
    <div id="parent">
      <NavBar performSearch={search} user={currentUser.name} logoutHandler={handleLogout} />
      <h3 style={{ transform: "translateX(26%)", display: "inline", position: "relative", left: "8%" }}>Home</h3>
      {isLoading ? (
        <p style={{ paddingLeft: "140px" }}>Loading products...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error loading products: {error.message}</p>
      ) : (
        <div id="products">
          {products.map((product) => (
            <ProductCard key={product.product_id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
