import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormGroup,
  Form,
  FormSelect,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardSubtitle,
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

  console.log(data);
  const filler = data.filter(
    (items) =>
      (category === "All" || items.category === category) &&
      (!search || items.title.toLowerCase().includes(search.toLowerCase()))
  );
  console.log(filler);

  return (
    <>
      <section>
        <Form>
          <FormGroup className=" flex gap-7 justify-center">
            <FormControl
              className=" w-96 mt-20 p-2 border rounded-lg border-neutral-500 placeholder: font-sans placeholder: text-xl "
              type="text"
              placeholder="Search ... "
              onChange={(e) => setSearch(e.target.value)}
            ></FormControl>
            <FormSelect
              className=" w-40 mt-20 p-2 border rounded-lg "
              onChange={(e) => setCategoty(e.target.value)}
            >
              <option value="All">All</option>
              {Array.from(categoryRemove).map((item, index) => (
                <div>
                  <option key={index} value={item}>
                    {item}
                  </option>
                </div>
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
      {
        <div className="grid border grid-cols-3  container mx-auto px-4 py-5 bg-[#3F5F7F8]  mt-10 ">
          {filler.map((item, index) => (
            <div style={{ width: "16rem" }} key={index}>
              <Card
                style={{
                  width: "16rem",
                  objectFit: "cover",
                }}
              >
                <CardImg src={item.image}></CardImg>

                <CardBody>
                  <CardTitle> {item.category}</CardTitle>
                  <CardText>{item.title}</CardText>
                  <CardSubtitle> {item.price}</CardSubtitle>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      }
    </>
  );
};

export default Home;
