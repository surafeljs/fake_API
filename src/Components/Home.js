import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormGroup,
  Form,
  FormSelect,
} from "react-bootstrap";
const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [category, setCategoty] = useState("All");
  const [search, setSearch] = useState(null);

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
  const categoryRemove = new Set(data.map((item) => item.category));

  const filler = data.filter((item) => {
    const itemTitle = item.title ? item.title.toLowerCase() : "";
    const searchTerm = search ? search.toLowerCase() : "";

    return (
      category === "All" ||
      item.category === category ||
      itemTitle.includes(searchTerm)
    );
  });
  console.log(filler);

  return (
    <>
      <section className="bg-[#F9F7F7] h-screen">
        <Form>
          <FormGroup className=" flex gap-7 justify-center">
            <FormControl
              className=" w-96 mt-20 p-2 border rounded-lg border-neutral-500 placeholder: font-sans placeholder: text-xl "
              type="text"
              placeholder="Search ... "
              onChange={(e) => setSearch(e.target.value)}
            ></FormControl>
            <FormSelect
              className=" w-28 mt-20 p-2 border rounded-lg"
              onChange={(e) => setCategoty(e.target.value)}
            >
              {/* <option value={"All"}>All</option>
              <option value={"men's clothing"}>men's clothing</option>
              <option value={"women's clothing"}>women's clothing</option>
              <option value={"jewelery"}>jewelery</option>
              <option value={"electronics"}>electronics</option> */}
              {Array.from(categoryRemove).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </FormSelect>
            <FormControl
              className="bg-[#EEEEEE] mt-20 w-40 text-lg font-sans hover:text-[#FFFF] transition-all duration-300 hover:bg-[#BBE1FA]
            p-2 border rounded-lg"
              type="submit"
              value={"Search"}
              placeholder="Search ... "
            ></FormControl>
          </FormGroup>
        </Form>
      </section>
    </>
  );
};

export default Home;
