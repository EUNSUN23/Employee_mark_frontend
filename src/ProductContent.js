import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

const ProductContent = () => {
  return (
    <Grid container spacing={4}>
      {/*spacing 1의 크기도 default theme에 정의되어 있음. 8px. */}
      <Grid item xs={12} sm={4}>
        <ProductCard />
      </Grid>
    </Grid>
  );
};

export default ProductContent;
