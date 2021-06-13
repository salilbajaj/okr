import useFetch from "../../utils/useFetch";
import Accordian from "../../components/accordian";
import React, { useEffect, useState } from "react";
import "./style.css";
import {OkrConstants } from "../../utils/Constant";

// Landing page of the app
const Home = () => {
  const { error, isPending, data } = useFetch(OkrConstants.APIURL);  // fetches the required data via custom hook
  const [filteredData, setFilteredData] = useState([]);   // state variable for okr data

  const handleFilter = (val) => {  // method to handle category filters
    let filtered = val ? data.filter((item) => item.category === val) : data;
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data, setFilteredData]);

  return (
    <div className="main-container">
      <select
        className="select-category"
        name="category"        
        onChange={(e) => {
          handleFilter(e.target.value);
        }}
      >
        <option value="">Select Category..</option>
        {OkrConstants.CATEGORIES.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <div>
        {error && <div>{error}</div>}
        {isPending && <div>Loading result...</div>}
        {filteredData &&
          filteredData.map((objective) => {
            return (
              <Accordian
                title={objective.title}
                objective={objective}
                key={objective.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
