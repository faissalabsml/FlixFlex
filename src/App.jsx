import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Title from "./pages/Title";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/tvshows" element={<Home />} />

        <Route path="/title" element={<Title />} />
        <Route path="/search/:query" element={<SearchResults />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
