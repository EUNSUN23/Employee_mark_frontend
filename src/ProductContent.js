import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import employeeList from "./constants";

const ProductContent = () => {
  const getEmployeeList = (employee) => {
    return (
      <ProductCard
        name={employee.name}
        rank={employee.rank}
        chart={employee.chart}
        portrait={employee.portrait}
        department={employee.department}
        role={employee.role}
        office={employee.office}
        lastUpdate={employee.lastUpdate}
      />
    );
  };
  return (
    <Grid container spacing={4}>
      {/*spacing 1의 크기도 default theme에 정의되어 있음. 8px. */}
      <Grid item xs={12} sm={4}>
        {employeeList.map((employee) => {
          return getEmployeeList(employee);
        })}
      </Grid>
    </Grid>
  );
};

export default ProductContent;
