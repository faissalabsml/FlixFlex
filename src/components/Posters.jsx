import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@vectopus/atlas-icons-react";

import Poster from "./Poster";

const SCROLL_AMOUNT = 150;

function Posters({ postersList }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef();

  function handleScroll(amount) {
    // setScrollPosition((prevPos) => prevPos + amount);
    const newScrollPosition = scrollPosition + amount;

    setScrollPosition(newScrollPosition);

    containerRef.current.scrollLeft = newScrollPosition;

    console.log(scrollPosition);
  }

  return (
    <div className="posters-container">
      <button
        className="arrow arrow-left"
        onClick={() => handleScroll(-SCROLL_AMOUNT)}
      >
        <ArrowLeft size={24} />
      </button>
      <ul className="posters_list" ref={containerRef}>
        {postersList &&
          postersList
            .filter((poster) => poster.popularity > 1)
            .map((poster) => <Poster key={poster.id} posterInfo={poster} />)}
      </ul>
      <button
        className="arrow arrow-right"
        onClick={() => handleScroll(SCROLL_AMOUNT)}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
}

export default Posters;
