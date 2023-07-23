import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import ListData from "./Listdata";
import WithNavigate from "./Latihan";
function App() {

  return (
    <>

    <BrowserRouter >
    
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/play/intructor" element={<Contact />}/>
      <Route exact path="/list/data" element={<ListData />}/>
      <Route exact path="/mulai/latihan" element={<WithNavigate />}/>

    </Routes>
    </BrowserRouter> 
    
    </>
  )
}

export default App;
