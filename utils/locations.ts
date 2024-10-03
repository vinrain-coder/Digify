// src/utils/locations.ts

// Define a union type for the counties
export type CountyName =
  | "Nairobi"
  | "Mombasa"
  | "Kisumu"
  | "Nakuru"
  | "Eldoret";

// Define the structure for delivery charges
export type DeliveryCharges = {
  [key in CountyName]: {
    [city: string]: number;
  };
};

export const counties = [
  { name: "Nairobi", cities: ["Westlands", "Kibera", "Karen"] },
  { name: "Mombasa", cities: ["Nyali", "Likoni", "Mvita"] },
  { name: "Kisumu", cities: ["Kondele", "Nyalenda", "Milimani"] },
  { name: "Nakuru", cities: ["Naivasha", "Njoro", "Rongai"] },
  { name: "Eldoret", cities: ["Kapsabet", "Langas", "Kapsoya"] },
];

export const getCitiesByCounty = (countyName: string): string[] => {
  const county = counties.find((county) => county.name === countyName);
  return county ? county.cities : [];
};

// Define the delivery charges according to the counties and their cities
export const deliveryCharges: DeliveryCharges = {
  Nairobi: { Westlands: 200, Kibera: 150, Karen: 250 },
  Mombasa: { Nyali: 250, Likoni: 300, Mvita: 220 },
  Kisumu: { Kondele: 150, Nyalenda: 100, Milimani: 180 },
  Nakuru: { Naivasha: 100, Njoro: 120, Rongai: 110 },
  Eldoret: { Kapsabet: 150, Langas: 120, Kapsoya: 140 },
};

export const getDeliveryCharges = (
  county: CountyName,
  city: string
): number | null => {
  return deliveryCharges[county]?.[city] || null;
};
