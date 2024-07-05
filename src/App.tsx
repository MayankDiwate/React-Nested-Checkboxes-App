import { Toaster } from "react-hot-toast";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="*"
          element={
            <p className="flex items-center justify-center h-screen">
              There's nothing here: 404!
            </p>
          }
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App;
