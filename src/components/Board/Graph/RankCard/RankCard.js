import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import Svg from "../../../../shared/svgIcons";

const Container = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: auto;
  width: 100%;
  height: 60%;
  margin: 0 auto;
`;

const Entire = styled.div`
  border: 1px solid blue;
`;

const Dept = styled.div`
  border: 1px solid red;
`;

const Title = styled.div`
  border: 1px solid green;
`;

const RankCard = (props) => {
  const { data, type } = props;
  const { dept_name, title } = useSelector(
    (state) => ({
      dept_name: state.searchEmp.openedEmp.dept_name,
      title: state.searchEmp.openedEmp.title,
    }),
    shallowEqual
  );

  // const createRanks = (data, type) => {
  //   const rankContents = Object.keys(data).map((key, idx) => {
  //     return (
  //       <Grid item className={classes.rank} key={type + "_" + key} xs={4}>
  //         <Typography variant="h6" component="h2">
  //           <div className={`${classes.rank} title`}>
  //             <span>{data[key]}위</span>
  //           </div>
  //         </Typography>
  //       </Grid>
  //     );
  //   });
  //   console.log(rankContents);
  //   return rankContents;
  // };

  // dept: 31438
  // entire: 116860
  // title: 55328

  console.log("rank", data, type);

  return (
    <Container>
      <Entire>
        <span className="rank">전체</span>
        <span>{`${data.entire}위`}</span>
      </Entire>
      <Dept>
        <Svg name={dept_name} component="span" />
        <span className="rank">{`${data.dept}위`}</span>
      </Dept>
      <Title>
        <Svg name={title} component="span" />
        <span className="rank">{`${data.title}위`}</span>
      </Title>
    </Container>
  );
};

export default RankCard;
