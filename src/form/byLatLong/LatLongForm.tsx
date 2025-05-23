import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { formatDate } from "../../lib/utils";

import type { FormValues } from "../../types/formLatLong";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";




export default function LatLongForm() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {
      latMin: "",
      latMax: "",
      lonMin: "",
      lonMax: "",
      dateMin: "",
      dateMax: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const onSubmit = async (data: FormValues) => {
    const { latMin, latMax, lonMin, lonMax, dateMin,dateMax } = data;
    const formattedDateMin: string = formatDate(dateMin);
    const formattedDateMax: string = formatDate(dateMax);
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
       
       `https://backend-qxo7.onrender.com/api/earthquake?latmin=${latMin}&latmax=${latMax}&lonmin=${lonMin}&lonmax=${lonMax}&datemin=${formattedDateMin}&datemax=${formattedDateMax}&page&limit`
      );
      const json = await res.json();
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
      setLoading(false);

        return;
      }

      navigate("/results", {
        state: {
          results: json.results || [],
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
       <CarouselItem key={2} className="relative w-full h-screen">
            <img
              src={`/img/image2.jpg`}
              alt={`Imagen 2`}
              className="absolute inset-0 w-full h-full object-cover brightness-50"
            />
          </CarouselItem>
      </CarouselContent>

      {/* TODO: FIX CAROUSEL */}
      
      {/* <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white text-black p-2 rounded-full" />
      <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white text-black p-2 rounded-full" /> */}
    </Carousel>


      {/* Formulario sobre el fondo */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-xl bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-xl space-y-6">
          <h1 className="text-2xl font-bold text-center">Chile Earthquake Finder</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             

              <FormField
                    control={form.control}
                    name="latMin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Latitude Min</FormLabel>
                        <FormControl>
                            <Input type="number" step="any" placeholder="Ej. -56" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="latMax"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Latitude Max</FormLabel>
                        <FormControl>
                            <Input type="number" step="any" placeholder="Ej. -17" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="lonMin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Longitude Min</FormLabel>
                        <FormControl>
                            <Input type="number" step="any" placeholder="Ej. -76" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="lonMax"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Longitude Max</FormLabel>
                        <FormControl>
                            <Input type="number" step="any" placeholder="Ej. -66" {...field} />
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
                      <Input type="date" {...field} />
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
                      <Input type="date" {...field} />
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
