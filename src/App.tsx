import { useNavigate } from "react-router-dom"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"

export default function App() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full min-h-screen">
      {/* 🌄 Fondo carrusel */}
      <Carousel className="absolute inset-0 z-0">
        <CarouselContent>
          {["1", "2", "3"].map((n) => (
            <CarouselItem key={n} className="relative w-full h-screen">
              <img
                src={`/img/image${n}.jpg`}
                alt={`Imagen ${n}`}
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
     </Carousel>

      {/* 🌐 Contenido encima */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-10 rounded-lg shadow-xl text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">🌍 Chile Earthquake Finder</h1>
          <p className="text-lg text-gray-700">
            Welcome to the seismic earthquake finder! Here you can search for earthquakes in Chile by region or by latitude and longitude.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => navigate("/form-region")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg"
            >
              Find by Region
            </button>
            <button
              onClick={() => navigate("/form-lat-long")}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-lg"
            >
              Find by Coordinates
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
