import React, { useEffect, useState } from "react";

import Posters from "./Posters";

function Hero({ content }) {
  // const [top5, setTop5] = useState([]);

  // useEffect(() => {
  //   axios.get(endpoints.popular).then((response) => {
  //     const results = response.data.results;
  //     const nextTop5 = results.slice(0, 5);

  //     setTop5(results.slice(0, 5));

  //     console.log(nextTop5);
  //   });
  // }, []);

  // if (!top5) return <p>Fetching...</p>;

  const posters = content.slice(0, 5);
  console.log(posters);

  return (
    <>
      <h1>Browse movies and TV shows</h1>
      <section className="top5">
        <h2 className="section_title">Top 5</h2>
        <Posters postersList={posters} />
        {/* <ul className="posters_list">
          {content.slice(0, 5).map((poster) => (
            <Posters key={poster.id} posterInfo={poster} top5={true} />
          ))}
        </ul> */}
      </section>
    </>
  );
}

export default Hero;
