import React, { useEffect } from "react";

const Checkout = ({ totalAmount }) => {
  
  // ✅ Load Razorpay Script Before Payment
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    const response = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount, currency: "INR" }),
    });

    const order = await response.json();

    // ✅ Check if Razorpay SDK is loaded
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_89g1mV1jcYw8DI", // ✅ Your Razorpay Key
      amount: order.amount,
      currency: order.currency,
      name: "SmartBite",
      description: "Food Order Payment",
      order_id: order.id,
      handler: async (response) => {
        const verifyResponse = await fetch("http://localhost:5000/api/payment/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyResponse.json();
        if (verifyData.success) {
          alert("✅ Payment successful!");
        } else {
          alert("❌ Payment failed!");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} className="btn btn-primary mt-3">
      Pay ₹{totalAmount}
    </button>
  );
};

export default Checkout;
