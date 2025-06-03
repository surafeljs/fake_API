import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, FormControl, FormGroup, Form } from "react-bootstrap";
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
  const handler = (e) => {
    e.preventDefault();
    console.log("fff");
  };
  return (
    <>
      <Form onSubmit={handler}>
        <FormGroup className="flex flex-col justify-center  ">
          <FormControl
            className=" border rounded-lg border-neutral-500 "
            type="text"
            placeholder="Search ... "
          ></FormControl>
          <FormControl
            className="bg-[#EEEEEE]"
            type="submit"
            placeholder="Search ... "
          ></FormControl>
        </FormGroup>
      </Form>
    </>
  );
};

export default Home;
