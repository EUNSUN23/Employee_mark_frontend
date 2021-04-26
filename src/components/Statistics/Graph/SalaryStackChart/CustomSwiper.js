import { Swiper } from "swiper";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { setChartColor } from "../../../../shared/utility";
import CustomizedLabel from "../SalaryDist/CustomizedLabel";

SwiperCore.use([Navigation, Pagination, Scrollbar]);

const useStyles = makeStyles(() => ({
  swiperContainer: {
    width: "65%",
    position: "absolute",
    left: "50%",
    top: "20%",
    transform: "translateX(-50%)",
  },
  swiperWrapper: {
    display: "grid",
    gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto",
    listStyle: "none",
    position: "relative",
    height: 430,
  },
  chartContainer: {
    position: "absolute",
    left: 0,
  },

  prevNav: { border: "1px solid black" },
  nextNav: { border: "1px solid black" },
}));

const swiper = new Swiper("makeStyles-swiperContainer-46-container", {
  speed: 400,
  spaceBetween: 100,
  pagination: {
    el: ".swiperPagination",
    type: "custom",
    renderCustom: (swiper, current, total) => {
      const dept = [
        "Customer Service",
        "Development",
        "Finance",
        "Human Resources",
        "Marketing",
        "Production",
        "Quality Management",
        "Research",
        "Sales",
      ];
      return dept[current - 1];
    },
  },
});

const CustomSwiper = (props) => {
  const classes = useStyles();
  const { deptData, value } = props;

  return (
    <div className="swiperContainer">
      <ul className={classes.swiperWrapper}>
        {Object.keys(deptData).map((dept, idx) => {
          const data = deptData[dept];
          return (
            <li key={`chart-${dept}`} className={classes.swiperSlide}>
              <ResponsiveContainer
                width="100%"
                height={380}
                className={classes.chartContainer}
              >
                <BarChart data={data} margin={{ top: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sal" tick={false} />
                  <YAxis dataKey="cnt" />

                  <Bar
                    dataKey="cnt"
                    fill="#8884d8"
                    label={<CustomizedLabel currentVal={value} />}
                  >
                    {data.map((entry, index) => {
                      const highlight = entry.sal === value;
                      const color = setChartColor(entry.dept_name, highlight);
                      return (
                        <Cell
                          fill={color}
                          key={`cell-${index}`}
                          stroke="false"
                          strokeDasharray="5,5"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </li>
          );
        })}
      </ul>
      <div className={classes.swiperPagination}></div>
      <span className={classes.prevNav} onClick={() => swiper.slidePrev()}>
        prevNAV
      </span>
      <span className={classes.nextNav} onClick={() => swiper.slideNext()}>
        nextNav
      </span>
    </div>
  );
};

export default CustomSwiper;
