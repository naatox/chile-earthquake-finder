import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Coordinates = {
  latMin: number
  latMax: number
  lonMin: number
  lonMax: number
}




const regionCoordinates: Record<string, Coordinates> = {
  "Arica y Parinacota (XV)": { latMin: -18.5, latMax: -17.5, lonMin: -70.5, lonMax: -69.3 },
  "Tarapacá (I)": { latMin: -21.5, latMax: -19.5, lonMin: -70.5, lonMax: -68.5 },
  "Antofagasta (II)": { latMin: -26.1, latMax: -20.9, lonMin: -70.5, lonMax: -67.0 },
  "Atacama (III)": { latMin: -29.0, latMax: -25.0, lonMin: -71.5, lonMax: -69.0 },
  "Coquimbo (IV)": { latMin: -32.5, latMax: -29.0, lonMin: -71.7, lonMax: -70.0 },
  "Valparaíso (V)": { latMin: -33.7, latMax: -32.0, lonMin: -72.0, lonMax: -70.5 },
  "Metropolitana de Santiago (RM)": { latMin: -34.2, latMax: -33.0, lonMin: -71.5, lonMax: -70.3 },
  "O’Higgins (VI)": { latMin: -35.0, latMax: -33.8, lonMin: -72.0, lonMax: -70.3 },
  "Maule (VII)": { latMin: -36.3, latMax: -34.5, lonMin: -72.5, lonMax: -70.5 },
  "Ñuble (XVI)": { latMin: -37.3, latMax: -35.5, lonMin: -72.5, lonMax: -71.0 },
  "Biobío (VIII)": { latMin: -38.5, latMax: -36.5, lonMin: -73.5, lonMax: -71.5 },
  "La Araucanía (IX)": { latMin: -39.5, latMax: -37.5, lonMin: -73.0, lonMax: -71.0 },
  "Los Ríos (XIV)": { latMin: -40.5, latMax: -39.0, lonMin: -73.5, lonMax: -71.5 },
  "Los Lagos (X)": { latMin: -43.5, latMax: -40.0, lonMin: -74.5, lonMax: -71.5 },
  "Aysén (XI)": { latMin: -47.0, latMax: -43.0, lonMin: -75.5, lonMax: -71.0 },
  "Magallanes y Antártica Chilena (XII)": { latMin: -56.0, latMax: -48.0, lonMin: -75.5, lonMax: -66.5 },
};


export function getRegionCoordinates(region: string): Coordinates | null {
  return regionCoordinates[region] || { latMin: "", latMax: "", lonMin: "", lonMax: "" }
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}
