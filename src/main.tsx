import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ResultsPage from "./earthquakeResults/ResultsPage";
import LatLongForm from "./form/byLatLong/LatLongForm";
import RegionForm from "./form/byRegion/RegionForm";
import './index.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form-lat-long" element={<LatLongForm />} />
        <Route path="/form-region" element={<RegionForm />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
