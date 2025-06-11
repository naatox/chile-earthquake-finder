import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import ResultsPage from "./earthquakeResults/ResultsPage";
import LatLongForm from "./form/byLatLong/LatLongForm";
import RegionForm from "./form/byRegion/RegionForm";
import NotFoundPage from "./error/NotFoundPage";
import './index.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<App />} />
        <Route path="/form-lat-long" element={<LatLongForm />} />
        <Route path="/form-region" element={<RegionForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
