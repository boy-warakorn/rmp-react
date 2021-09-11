import React from "react";
import Chart from "react-apexcharts";

const RoomOccupiedChart = () => {
  return (
    <Chart
      type="radialBar"
      series={[25]}
      height={350}
      options={{
        labels: ["Room Occupied"],
        grid: {
          show: true,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "50px",
            },
            dataLabels: {
              name: {
                fontSize: "16px",
                fontFamily: "MontserratMedium",
                offsetY: 30,
              },
              value: {
                offsetY: -17.5,
                fontSize: "36px",
                fontFamily: "MontserratBold",
              },
            },
          },
        },
      }}
    />
  );
};

export default RoomOccupiedChart;
