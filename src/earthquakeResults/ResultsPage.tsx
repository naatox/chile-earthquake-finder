import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const RESULTS_PER_PAGE = 13;

// Custom icon loader based on magnitude
const getMarkerIcon = (magnitude: number) => {
  let iconUrl = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
  if (magnitude >= 7.0) {
    iconUrl = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
  } else if (magnitude >= 5.0) {
    iconUrl = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
  }

  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

function getPagination(current: number, total: number, delta = 1): (number | string)[] {
  const pages: (number | string)[] = [];
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  pages.push(1);
  if (start > 2) pages.push("...");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  return pages;
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  let { results = [], latMin, latMax, lonMin, lonMax, region } = location.state || {};

  // Filter out invalid results
  const validResults = results.filter(
    (eq: any) => eq.day !== undefined && eq.month !== undefined
  );

  if (!validResults || validResults.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">No Valid Results Found</h1>
        <p className="text-sm text-gray-600 mb-4">
          Some earthquake records had missing date information.
        </p>
        <Button onClick={() => navigate("/")}>Go back</Button>
      </div>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(validResults.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const currentResults = validResults.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageSelect = (page: number) => setCurrentPage(page);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  latMax = parseFloat(latMax);
  latMin = parseFloat(latMin);
  lonMax = parseFloat(lonMax);
  lonMin = parseFloat(lonMin);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Earthquake Results</h1>
        <Button onClick={() => navigate("/")}>Go back</Button>
      </div>

      {/* Info de región */}
      {(latMin && latMax && lonMin && lonMax) && (
        <div className="p-2 bg-gray-200 border rounded text-sm text-black-700 mb-2">
          {region ? (
            <span>
              <strong>Search area:</strong> Region of <span className="font-semibold">{region}</span>,
              latitude between <span className="font-semibold">{latMin}</span> and <span className="font-semibold">{latMax}</span>,
              longitude between <span className="font-semibold">{lonMin}</span> and <span className="font-semibold">{lonMax}</span>.
            </span>
          ) : (
            <span>
              <strong>Search area:</strong> Latitude between <span className="font-semibold">{latMin}</span> and <span className="font-semibold">{latMax}</span>,
              longitude between <span className="font-semibold">{lonMin}</span> and <span className="font-semibold">{lonMax}</span>.
            </span>
          )}
        </div>
      )}

      {/* Subtítulo */}
      <p className="text-sm text-gray-600 mb-2">
        Showing {startIndex + 1}–{Math.min(startIndex + RESULTS_PER_PAGE, validResults.length)} of {validResults.length} results
      </p>

      {/* Contenido: Mapa + Tabla */}
      <div className="flex flex-col md:flex-row gap-4 overflow-hidden max-h-[calc(100vh-250px)]">
        {/* Mapa */}
        <div className="w-full md:w-1/2 h-[400px] mt-10">
          <MapContainer
            center={[
              latMin && latMax ? (latMin + latMax) / 2 : -20,
              lonMin && lonMax ? (lonMin + lonMax) / 2 : -70,
            ]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            {currentResults.map((eq: any) => {
              const { latitude, longitude, magnitude_mwg, id } = eq;
              return (
                <Marker
                  key={id}
                  position={[-latitude, -longitude]}
                  icon={getMarkerIcon(magnitude_mwg)}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>Magnitude:</strong> {magnitude_mwg}<br />
                      <strong>Lat:</strong> -{latitude}<br />
                      <strong>Lng:</strong> -{longitude}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Tabla */}
        <div className="w-full md:w-1/2">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Magnitude (Mwg)</TableHead>
                <TableHead className="text-center">Latitude</TableHead>
                <TableHead className="text-center">Longitude</TableHead>
                <TableHead className="text-center">Depth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResults.map((eq: any) => {
                const { depth, magnitude_mwg, latitude, longitude, hour, minute, day, month, year } = eq;
                const date = `${hour}:${minute} ${day}/${month}/${year}`;

                return (
                  <TableRow key={eq.id}>
                    <TableCell className="text-center">{date}</TableCell>
                    <TableCell className="text-center">{magnitude_mwg}</TableCell>
                    <TableCell className="text-center">-{latitude}</TableCell>
                    <TableCell className="text-center">-{longitude}</TableCell>
                    <TableCell className="text-center">{depth}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Paginación */}
      <div className="flex flex-wrap justify-center items-center mt-4 gap-2">
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>

        {getPagination(currentPage, totalPages).map((item, index) =>
          typeof item === "number" ? (
            <Button
              key={index}
              variant={currentPage === item ? "default" : "outline"}
              className={currentPage === item ? "font-bold border border-primary" : ""}
              onClick={() => handlePageSelect(item)}
            >
              {item}
            </Button>
          ) : (
            <span key={index} className="px-2 text-gray-500 select-none">
              ...
            </span>
          )
        )}

        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
