import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Checkout from "../components/Checkout";  // Import the Checkout component

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("Retrieved userEmail:", userEmail);

    if (!userEmail) {
      alert("User email not found. Please log in.");
      window.location.href = "/login";
      return;
    }

    if (!Array.isArray(data) || data.length === 0) {
      alert("Cart data is invalid.");
      return;
    }

    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    console.log("Order RESPONSE:::::", response.status);
    if (response.ok) {
      dispatch({ type: "DROP" });
      alert("Order placed successfully!");
    } else {
      let errorData = await response.json();
      console.log("🔹 Order ERROR response:", errorData);
      alert("Order failed: " + errorData.error);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive bg-white text-dark p-3 shadow-lg rounded">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <DeleteIcon
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>

        {/* ✅ Checkout Button */}
        <div>
          <button className="btn bg-success mt-3" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>

        {/* ✅ Add Razorpay Payment Button */}
        <div className="mt-3">
          <Checkout totalAmount={totalPrice} />
        </div>
      </div>
    </div>
  );
}
