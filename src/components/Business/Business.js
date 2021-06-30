import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Business() {
  const [allData, setAllData] = useState([]);

  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    axios("https://challenge-rest-api.vercel.app/business")
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error retrieving data:" + error);
      });
  }, []);
  return <div></div>;
}
