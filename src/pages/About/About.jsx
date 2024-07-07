import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"
import "./about.css"


function About() {

	const [currentUser, setCurrentUser] = useState({})
	const navigate = useNavigate()


	useEffect(() => {
		const token = localStorage.getItem("token")
		if(!token){
		  navigate("/login")
		} else {
		  const decodedToken = jwtDecode(token);
		  setCurrentUser(decodedToken)
		}
	}, [])
	
	return (
		<div id="main-about-container">
			<NavBar user={currentUser.name}/>
			<div class="about-container">
			  <h1 class="about-header">About Shoda</h1>
			  <p class="about-content">
			    Shoda is a multi-vendor ecommerce platform that connects you with a variety of independent sellers offering unique products. We strive to provide a convenient and diverse shopping experience for our customers.
			  </p>
			  <p class="about-content">
			    For Sellers: shoda offers a simple and affordable way to reach a wider audience and sell your products online. With our easy-to-use platform, you can manage your inventory, listings, and orders with ease.
			  </p>
			  <p class="about-content">
			    For Buyers: shoda offers a one-stop shop for a wide variety of products from different vendors. Find unique items, compare prices, and enjoy a convenient shopping experience.
			  </p>
			</div>
		</div>
	)
}

export default About;