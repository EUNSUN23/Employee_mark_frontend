import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";
import PM from "./assets/em1.jpg";

const ProductContent = () => {
  return (
    <Grid container spacing={4}>
      {/*spacing 1의 크기도 default theme에 정의되어 있음. 8px. */}
      <Grid item xs={12} sm={4}>
        <ProductCard title="Kate" subheader="department1, PM" avatarSrc={PM} />
      </Grid>
    </Grid>
  );
};

export default ProductContent;
