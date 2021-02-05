import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Track from "./Track";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 170,

    transform: "translate(8%,-20%)",
  },
  Bar: {
    width: "125%",
    height: "20%",
    transform: "translateY(50%)",
  },
  indicator: {
    border: "3px solid red",
  },
  Tab: {
    minHeight: 35,
    height: 35,
  },
  track: {
    transform: "translate(50%,-20%)",
    width: 255,
    height: 100,
  },
  tabPanel_dept: {
    height: 160,
  },
  tabPanel_salary: {
    height: 160,
  },
}));

const HistoryTab = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log("handleChange", newValue);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    console.log("handleChangeIndex", index);
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.Bar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="부서 이동"
            {...a11yProps(0)}
            classes={{
              indicator: classes.indicator,
            }}
          />
          <Tab
            label="연봉 변동"
            {...a11yProps(1)}
            classes={{ root: classes.Tab }}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          className={classes.tabPanel_dept}
        >
          <div className={classes.track}>
            <Track type="dept" />
          </div>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          className={classes.tabPanel_salary}
        >
          <div className={classes.track}>
            <Track type="salary" />
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default HistoryTab;
