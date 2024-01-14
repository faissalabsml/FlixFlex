import React, { useEffect, useState } from "react";

import Posters from "./Posters";
import { getPosters } from "../utils/api";

function Hero({ type }) {
  const [top5, setTop5] = useState([]);

  const popularEndpoint = type.find((ele) =>
    ele.endpoint.startsWith("popular")
  );

  console.log(popularEndpoint);

  // useEffect(() => {
  //   axios.get(endpoints.popular).then((response) => {
  //     const results = response.data.results;
  //     const nextTop5 = results.slice(0, 5);

  //     setTop5(results.slice(0, 5));

  //     console.log(nextTop5);
  //   });
  // }, []);

  useEffect(() => {
    getPosters(popularEndpoint.endpoint)
      .then((results) => {
        setTop5(results.slice(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [popularEndpoint]);

  // if (!top5) return <p>Fetching...</p>;

  // const posters = content.slice(0, 5);
  // console.log(posters);

  return (
    <>
      <h1>Browse movies and TV shows</h1>
      <section className="top5">
        <h2 className="section_title">Top 5</h2>
        <Posters postersList={top5} />
      </section>
    </>
  );
}

export default Hero;
