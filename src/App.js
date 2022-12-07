import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/register/Register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
