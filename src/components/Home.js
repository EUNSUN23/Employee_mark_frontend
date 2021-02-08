import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <h3>
        <NavLink to="/board">직원 검색</NavLink>
      </h3>
      <h3>
        <NavLink to="/statistics">통계 검색</NavLink>
      </h3>
    </div>
  );
};

export default Home;
