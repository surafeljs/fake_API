import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const API = "https://fakestoreapi.com/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API);
        setData(response.data);
      } catch (err) {
        setError("Data not fetched");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((items, index) => {
        return (
          <div key={index}>
            <ul>
              <li>{items.id} </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Home;
