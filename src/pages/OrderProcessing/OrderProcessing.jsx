import { useEffect } from "react";
import "./order-processing.css"
import { useNavigate } from "react-router-dom";



export default function OrderProcess() {

    const navigate = useNavigate();

    // src/api.js
    //should move to other file and imported from "./api"
    const processOrder = async (orderData) => {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND}/orders`, {
            method: 'POST',
            headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
            },
            body: JSON.stringify({order: orderData})
        });
        if (response.ok) {
            const data = await response.json();
            navigate("/shopper")    
        } else {
            const errorMessage = `Error ${response.status}: ${response.statusText}. Network response was not ok.`;
            alert(errorMessage)
            throw new Error(errorMessage);
        }
    };

    useEffect(() => {
        const orderPayload = JSON.parse(localStorage.getItem("deliveryAddress"))
        console.log("order payload:", orderPayload)
        const orderData = {
            "phone_number": orderPayload.phoneNumber,
            "address": orderPayload.address,
            "city": orderPayload.city,
            "postal_code": orderPayload.postalCode,
        }
        processOrder(orderData)
        // localStorage.removeItem("deliveryAddress")
        // localStorage.removeItem("checkout_url")
    }, [])
   
    return (
        <div id="main-order-process-container">
            <div>
                <p>Order Processing...</p>
            </div>
        </div>
    )
}