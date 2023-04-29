import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Study } from "./pages/Study";
import {Home} from "./pages/Home"
import './App.css';

const background = require('./images/16080076_Landscape_with_mountains_at_sunset_1103.jpg');
const divStyle = {
  width: '100vw',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
};

function App() {
  return (
    <div className ="app" style = {divStyle}>
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
   </div>
  );
}

export default App;