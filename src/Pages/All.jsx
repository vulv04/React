import React from "react";
import { Link } from "react-router-dom";

const All = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/task44">Task 44</Link>
          </li>
          <li>
            <Link to="/task45">Task 45</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default All;
