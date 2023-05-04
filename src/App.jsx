import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Offer from "./assets/pages/Offer";
import Home from "./assets/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
