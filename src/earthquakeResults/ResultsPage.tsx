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

const RESULTS_PER_PAGE = 13;

function getPagination(current: number, total: number, delta = 1): (number | string)[] {
  const pages: (number | string)[] = [];
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  pages.push(1);

  if (start > 2) pages.push("...");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < total - 1) pages.push("...");

  if (total > 1) pages.push(total);

  return pages;
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const currentResults = results.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Earthquake Results</h1>

      <Button onClick={() => navigate("/")}>Go back</Button>

      {results.length > 0 ? (
        <>
          <p className="text-sm text-gray-600 mt-2 mb-1">
            Showing {startIndex + 1}–{Math.min(startIndex + RESULTS_PER_PAGE, results.length)} of {results.length} results
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Magnitude (Mw)</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Depth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentResults.map((eq: any) => {
                const { depth, magnitude, latitude, longitude, hour, minute, day, month, year } = eq;
                const date = `${hour}:${minute} ${day}/${month}/${year}`;
                return (
                  <TableRow key={eq.id}>
                    <TableCell>{date}</TableCell>
                    <TableCell>{magnitude}</TableCell>
                    <TableCell>{latitude}</TableCell>
                    <TableCell>{longitude}</TableCell>
                    <TableCell>{depth}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex flex-wrap justify-center items-center mt-4 gap-2">
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>

            {getPagination(currentPage, totalPages).map((item, index) =>
              typeof item === "number" ? (
                <Button
                  key={index}
                  variant={currentPage === item ? "default" : "outline"}
                  className={currentPage === item ? "font-bold border border-primary" : ""}
                  onClick={() => handlePageSelect(item)}
                  aria-label={`Go to page ${item}`}
                >
                  {item}
                </Button>
              ) : (
                <span key={index} className="px-2 text-gray-500 select-none">
                  ...
                </span>
              )
            )}

            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-4">No se encontraron resultados.</p>
      )}
    </div>
  );
}
