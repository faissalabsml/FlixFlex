import React, { useEffect, useState } from "react";

function Loading({ text }) {
  const [loadingText, setLoadingText] = useState(text);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setLoadingText((prevText) =>
        prevText === `${text}...` ? text : `${prevText}.`
      );
    }, 300);

    return () => window.clearInterval(intervalId);
  }, [text]);

  return <div className="loading">{loadingText}</div>;
}

export default Loading;
