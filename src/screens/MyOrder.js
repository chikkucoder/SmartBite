import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            console.log("Fetching orders for:", email);

            const response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            console.log("🔹 Full API Response:", data);

            // Clean the order data
            const cleanedOrders = data.orderData.map(orderArray => {
                const rawDate = orderArray[0]?.Order_date;

                // Convert date
                const parsedDate = new Date(rawDate);
                const orderDate = !isNaN(parsedDate.getTime())
                    ? parsedDate.toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                    : "Invalid Date";

                const items = orderArray.slice(1); // Get food items

                return { orderDate, items };
            });

            console.log("✅ Cleaned Orders:", cleanedOrders);
            setOrderData(cleanedOrders);
        } catch (error) {
            console.error("❌ Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2>My Orders</h2>

                {orderData.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <div>
                        {orderData.map((order, index) => (
                            <div key={index} className="mb-4">
                                <h5 className="text-primary">Order Date: {order.orderDate}</h5>
                                <hr />
                                <div className="row">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="col-md-4">
                                            <div className="card mt-3" style={{ width: "18rem" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p>Quantity: {item.qty}</p>
                                                    <p>Size: {item.size}</p>
                                                    <p>Price: ₹{item.price}/-</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
