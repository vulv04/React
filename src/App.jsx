import { Routes, Route } from "react-router-dom";
import Quanlysinhvien from "./Pages/Quanlysinhvien";
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
      </Routes>
    </>
  );
}

export default App;
