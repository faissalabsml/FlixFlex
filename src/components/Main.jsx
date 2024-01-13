import React, { useEffect, useState } from "react";
import axios from "axios";

import endpoints from "../utils/api";
import Posters from "./Posters";

function Main() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    axios.get(endpoints.popular).then((response) => {
      const results = response.data.results;
      // const nextTop5 = results.slice(0, 5);

      setPosters(results);

      console.log(results);
    });
  }, []);

  if (!posters) return <p>Fetching...</p>;

  return (
    <section className="posters">
      <h2 className="section_title">Trending</h2>
      <Posters postersList={posters} />
    </section>
  );
}

export default Main;
