const express = require("express");
const cors = require("cors"); 
const dotenv = require("dotenv"); //  Load environment variables


const mongoDB = require("./db"); 
const app = express();
const port = 5000;

dotenv.config(); //  Load .env variables
mongoDB();

//  Use CORS middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend access
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

//  Import Routes
app.use("/api", require("./Routes/CreatUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api/payment", require("./Routes/paymentRoutes")); // Razorpay Payment Route
app.use("/api", require("./Routes/chatbot"));  // ✅ Chatbot route added

app.get("/", (req, res) => {
  res.send("Hello World");
});

//  Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
