import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder.js';
import Chatbot from './components/Chatbot'; // 👉 Import your chatbot

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>

          {/* 👉 Add chatbot outside of Routes to make it global */}
          <Chatbot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
