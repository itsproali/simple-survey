import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Database from "./pages/Database/Database";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/database" element={<Database />} />
      </Routes>
    </>
  );
}

export default App;
