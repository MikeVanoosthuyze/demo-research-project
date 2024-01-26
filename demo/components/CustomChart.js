// CustomChart.js

import React from "react";
import PropTypes from "prop-types";

const calculatePercentage = (value, maxValue) => {
  // Zorg ervoor dat het percentage niet meer dan 100 is
  const percentage = (value / maxValue) * 100;
  return Math.min(percentage, 100);
};

const CustomChart = ({ value }) => {
  // Stel de maximale waarde in
  const maxValue = 6000;

  const outerDivStyle = {
    width: "100px",
    height: "20px",
    backgroundColor: "#eee",
    borderRadius: "5px",
    position: "relative",
  };

  const innerDivStyle = {
    height: "100%",
    width: `${calculatePercentage(value, maxValue)}%`,
    backgroundColor: "#3498db",
    borderRadius: "5px",
  };

  return (
    <div style={outerDivStyle}>
      <div className="bg-red" style={innerDivStyle}>
        {" "}
      </div>
    </div>
  );
};

CustomChart.propTypes = {
  value: PropTypes.number.isRequired,
};

export default CustomChart;
