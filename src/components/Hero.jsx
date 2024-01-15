import React, { useEffect, useState } from "react";

import Posters from "./Posters";
import { getPosters } from "../utils/api";
import Loading from "../components/Loading";

function Hero({ type }) {
  const [top5, setTop5] = useState([]);

  const popularEndpoint = type.find((el) => el.endpoint.startsWith("popular"));

  useEffect(() => {
    getPosters(popularEndpoint.endpoint)
      .then((results) => {
        setTop5(results.slice(0, 5));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [popularEndpoint]);

  if (!top5) return <Loading text="Loading Top 5" />;

  return (
    <>
      <h1>Browse movies and TV shows</h1>
      <section className="top5">
        <h2 className="section_title">Current Top 5</h2>
        <Posters postersList={top5} />
      </section>
    </>
  );
}

export default Hero;
