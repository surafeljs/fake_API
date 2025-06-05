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
          </FormGroup>
        </Form>
      </section>
      {
        <div className="grid border  grid-cols-1 sm:grid-cols-2  md:grid-cols-3  space-y-5 container mx-auto px-4 py-5 bg-[#3F5F7F8]  mt-10 ">
          {filler.map((item, index) => (
            <div key={index}>
              <Card
                className="p-5 border rounded-lg shadow-lg"
                style={{
                  width: "16rem",
                  objectFit: "cover",
                }}
              >
                <CardImg
                  className="hover:scale-95 hover:skew-x-2 hover:opacity-80 transition-all duration-150"
                  src={item.image}
                ></CardImg>

                <CardBody>
                  <CardTitle className="font-sans text-xl mt-1">
                    {" "}
                    {item.category}
                  </CardTitle>
                  <CardText className="font-sans text-sm h-[1rem] overflow-hidden text-[#00ADB5]  mt-1">
                    {item.title}
                  </CardText>
                  <CardSubtitle className="text-gray-400 mt-1">
                    {" "}
                    {`${item.price} $`}
                  </CardSubtitle>
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
