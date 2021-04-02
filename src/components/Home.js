import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { emp, total, loading } = useSelector((state) => ({
    emp: state.home.emp,
    total: state.home.total,
    loading: state.home.loading,
  }));

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
