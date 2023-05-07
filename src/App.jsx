import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Offer from "./assets/pages/Offer";
import Home from "./assets/pages/Home";
import Signup from "./assets/pages/Signup";
import Login from "./assets/pages/Login";

// Components
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("vintedToken") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("vintedToken", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("vintedToken");
    }
  };
  return (
    <Router>
      <Header handleToken={handleToken} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
