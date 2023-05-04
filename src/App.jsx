import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./assets/pages/Home";

function App() {
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>;
}

export default App;
