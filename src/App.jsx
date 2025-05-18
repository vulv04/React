import { Routes, Route } from "react-router-dom";
import Quanlysinhvien from "./Pages/Quanlysinhvien";
import ProductList from "./Pages/ProductList";
import { students } from "./dataStudents";
import All from "./Pages/All";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<All />} />
        <Route
          path="/task44"
          element={<Quanlysinhvien students={students} />}
        />
        <Route path="/task45" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
