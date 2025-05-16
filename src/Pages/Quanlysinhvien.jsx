import React from "react";
import { students } from "../dataStudents";
import { useState } from "react";

const Quanlysinhvien = () => {
  const [student, setStudent] = useState(students);
  const [rankFilter, setRankFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("");
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <input
        type="text"
        placeholder="Nhập tên sinh viên"
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
      <h1>Danh sách sinh viên</h1>
      <label htmlFor="">Lọc học lực</label>
      <select
        name="student"
        id="locrank"
        onChange={(e) => setRankFilter(e.target.value)}
      >
        <option value="all">Tất cả</option>
        <option value="gioi">Giỏi</option>
        <option value="kha">Khá</option>
        <option value="trungbinh">Trung bình</option>
        <option value="yeu">Yếu</option>
      </select>
      <label htmlFor="">Lọc điểm</label>
      <select
        name=""
        id="locpotin"
        onChange={(e) => setScoreFilter(e.target.value)}
      >
        <option value="">Sắp xếp điểm</option>
        <option value="cao">Cao - Thấp</option>
        <option value="thap">Thấp - Cao</option>
      </select>

      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Toán</th>
            <th>Văn</th>
            <th>Tiếng Anh</th>
            <th>Điểm trung bình</th>
            <th>Học lực</th>
          </tr>
        </thead>
        <tbody>
          {student
            .filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase()))

            .filter((s) => {
              const avg = (s.math + s.literature + s.english) / 3;

              // Lọc học lực
              let matchRank = true;
              if (rankFilter !== "all") {
                if (avg >= 8) matchRank = rankFilter === "gioi";
                else if (avg >= 6.5) matchRank = rankFilter === "kha";
                else if (avg >= 5) matchRank = rankFilter === "trungbinh";
                else matchRank = rankFilter === "yeu";
              }

              return matchRank;
            })
            .sort((a, b) => {
              const avgA = (a.math + a.literature + a.english) / 3;
              const avgB = (b.math + b.literature + b.english) / 3;

              if (scoreFilter === "cao") return avgB - avgA;
              if (scoreFilter === "thap") return avgA - avgB;
              return 0;
            })
            .map((student) => {
              const average =
                (student.math + student.literature + student.english) / 3;
              let classification = "";
              if (average >= 8) classification = "Giỏi";
              else if (average >= 6.5) classification = "Khá";
              else if (average >= 5) classification = "Trung bình";
              else classification = "Yếu";

              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.math}</td>
                  <td>{student.literature}</td>
                  <td>{student.english}</td>
                  <td>{average.toFixed(2)}</td>
                  <td>{classification}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Quanlysinhvien;
