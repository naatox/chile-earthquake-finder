import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

import type { FormValues } from "../../types/formRegion";
import { getRegionCoordinates } from "../../lib/utils";
import { formatDate, validateDateIsNotInFuture } from "../../lib/utils";

import { DatePickerInput } from "@/components/ui/date-picker";



import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";


const regionesDeChile = [
  "Tarapacá (I)",
  "Antofagasta (II)",
  "Atacama (III)",
  "Coquimbo (IV)",
  "Valparaíso (V)",
  "Metropolitana de Santiago (RM)",
  "O'Higgins (VI)",
  "Maule (VII)",
  "Biobío (VIII)",
  "La Araucanía (IX)",
  "Los Lagos (X)",
  "Aysén (XI)",
  "Magallanes (XII)",
  "Los Ríos (XIV)",
  "Arica y Parinacota (XV)",
  "Ñuble (XVI)",
];

export default function RegionForm() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {
      dateMax: "",
      dateMin: "",
      region: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: FormValues) => {
    const { region, dateMin,dateMax } = data;
    const coords = getRegionCoordinates(region)

    if (!coords) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Select a valid region.",
        });
        return;
    }

    const { latMin, latMax, lonMin, lonMax } = coords

    
    const formattedDateMin: string = formatDate(dateMin);
    const formattedDateMax: string = formatDate(dateMax);
    
    const isValidDateMin = validateDateIsNotInFuture(dateMin);
    const isValidDateMax = validateDateIsNotInFuture(dateMax);

    console.log(dateMin, dateMax, formattedDateMin, formattedDateMax);
    if (!isValidDateMin || !isValidDateMax) {
      
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(

      `https://backend-qxo7.onrender.com/api/earthquake?latmin=${latMin}&latmax=${latMax}&lonmin=${lonMin}&lonmax=${lonMax}&datemin=${formattedDateMin}&datemax=${formattedDateMax}&page&limit`
      );
      const json = await res.json();
      console.log();

      if (res.status === 400) {
        Swal.fire({
          icon: "error",
          title: json.error,
          confirmButtonColor: "black",
          text:
            "Values must be between " +
            json.chileBounds.latitude.min +
            " and " +
            json.chileBounds.latitude.max +
            " for latitude, y " +
            json.chileBounds.longitude.min +
            " and " +
            json.chileBounds.longitude.max +
            " for longitude.",
        });
        return;
      }

      navigate("/results", {
        state: {
          results: json.results || [],
          latMin,
          latMax,
          lonMin,
          lonMax,
          region
        },
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid dates o region",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <div className="relative w-full min-h-screen">
        <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 z-30 bg-white/80 backdrop-blur text-black px-4 py-2 rounded shadow hover:bg-white transition"
            >
            ← Back
        </button>        
      {/* Fondo: Carousel */}
    <Carousel className="absolute inset-0 z-0">
      <CarouselContent>
        <CarouselItem key={3} className="relative w-full h-screen">
            <img
              src={`/img/image3.jpg`}
              alt={`Imagen 3`}
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
        </CarouselItem>
      </CarouselContent>

      
    </Carousel>


      {/* Formulario sobre el fondo */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-xl space-y-6">
          <h1 className="text-2xl font-bold text-center">Chile Earthquake Finder</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white/70 backdrop-blur border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                          <SelectValue placeholder="Select a Region" className="text-black" />
                        </SelectTrigger>

                        <SelectContent>
                          {regionesDeChile.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="dateMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                     <DatePickerInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <DatePickerInput value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2">
            {loading && (
                <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
                </svg>
            )}
            {loading ? "Searching..." : "Search Earthquakes"}
            </Button>
            </form>
          </Form>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
