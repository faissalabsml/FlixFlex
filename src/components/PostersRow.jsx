import React, { useEffect, useState } from "react";
import axios from "axios";

import endpoints from "../utils/api";
import Posters from "./Posters";

function PostersRow({ content, title }) {
  return (
    <section className="posters">
      <h2 className="section_title">{title}</h2>
      <Posters postersList={content} />
    </section>
  );
}

export default PostersRow;
