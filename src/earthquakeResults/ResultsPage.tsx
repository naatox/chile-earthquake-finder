import { useLocation, useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Earthquake Results</h1>

      <Button onClick={() => navigate("/")}>Go back</Button>

      {results.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Magnitude</TableHead>
                  <TableHead>Latitude</TableHead>
                  <TableHead>Longitude</TableHead>
                  <TableHead>Depth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((eq : any) => {
                  const { depth, magnitude, latitude,longitude , hour, minute, day , month, year } = eq;
                  //{new Date(time).toLocaleString()}
                  const date = hour + ":" + minute + " " + day + "/" + month + "/" + year;
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
      ) : (
        <p className="text-gray-500 mt-4">No se encontraron resultados.</p>
      )}
    </div>
  );
}
