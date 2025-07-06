import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FillInTheBlankPage1 from "./pages/FillInTheBlankPage1";
import FillInTheBlankPage2 from "./pages/FillInTheBlankPage2";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FillInTheBlankPage1 />} />
        <Route path="/page2" element={<FillInTheBlankPage2 />} />
      </Routes>
    </BrowserRouter>
  );
}
