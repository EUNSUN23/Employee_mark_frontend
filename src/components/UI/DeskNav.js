import React from "react";
import { Link } from "react-router-dom";

// home: {
//     cursor: "pointer",
//     width: 80,
//     height: 30,
//     "& .icon_home": {
//       width: 28,
//       height: 28,
//     },
//     "&:hover": {
//       "& span": {
//         fontWeight: "bold",
//       },
//     },
//   },
//   secondNav: {
//     cursor: "pointer",
//     width: 100,
//     height: 30,
//     "& .icon_secondNav": {
//       width: 28,
//       height: 28,
//     },
//     "&:hover": {
//       "& span": {
//         fontWeight: "bold",
//       },
//     },
//   },

// link: {
//     color: "white",
//     textDecoration: "none",
//     fontSize: "1.5vw",
//   },

const secondNav = (type) =>
  type === "statistics" ? (
    <>
      <Grid item className="icon_secondNav">
        <Svg name="EmployeeSearch" size="large" />
      </Grid>
      <Grid item>
        <Typography component="span" noWrap>
          <Link to="/board" className={classes.link}>
            직원 검색
          </Link>
        </Typography>
      </Grid>
    </>
  ) : (
    <>
      <Grid item className="icon_secondNav">
        <Svg name="SalaryStatistics" size="large" />
      </Grid>
      <Grid item>
        <Typography component="span" noWrap>
          <Link to="/statistics" className={classes.link}>
            연봉통계
          </Link>
        </Typography>
      </Grid>
    </>
  );

const DeskNav = ({ type }) => {
  return (
    <Grid
      item
      container
      className={classes.menu}
      alignItems="center"
      justify="flex-end"
    >
      <Grid
        item
        xs={5}
        container
        alignItems="center"
        justify="center"
        className={classes.home}
      >
        <Grid item className="icon_home">
          <Svg name="Home" size="large" />
        </Grid>
        <Grid item>
          <Typography component="span" noWrap>
            <Link to="/" className={classes.link}>
              홈으로
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justify="center"
        xs={5}
        className={classes.secondNav}
      >
        {secondNav(type)}
      </Grid>
    </Grid>
  );
};

export default DeskNav;
