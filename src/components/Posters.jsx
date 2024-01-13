import React from "react";

import Poster from "./Poster";

function Posters({ postersList }) {
  console.log(postersList);

  return (
    <ul className="posters_list">
      {postersList &&
        postersList
          .filter((poster) => poster.popularity > 1)
          .map((poster) => (
            <Poster key={poster.id} posterInfo={poster} />
          ))}
    </ul>
  );
}

export default Posters;
