import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProduct from "../src/pages/listProduct";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-screen-md mx-auto pt-20">
        <Routes>
          <Route path="/" element={<ListProduct />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
