import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Study } from "./pages/Study";
import {Home} from "./pages/Home"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element = {<Home />}>
          </Route>
          <Route path="/study" element = {<Study />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;