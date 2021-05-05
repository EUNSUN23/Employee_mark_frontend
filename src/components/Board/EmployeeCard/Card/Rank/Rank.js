import React from "react";
import { Grid } from "@material-ui/core";
import RankCard from "../../../Graph/RankCard/RankCard";
import Loader from "../../../../UI/Loader";
import DefaultPanel from "../../../../UI/DefaultPanel";

const Rank = (props) => {
  const { expanded, onChangeAccordion, type, data, getData, isLoading } = props;

  const rankCard = isLoading ? (
    <Grid container justify="center" component="section">
      <Grid component="article" />
      <Loader type="small" />
      <Grid component="article" />
    </Grid>
  ) : (
    <RankCard data={data} />
  );

  return (
    <>
      <DefaultPanel
        name="rank"
        expanded={expanded}
        type={type}
        getData={getData}
        onChangeAccordion={onChangeAccordion}
      >
        {rankCard}
      </DefaultPanel>
    </>
  );
};

export default Rank;
