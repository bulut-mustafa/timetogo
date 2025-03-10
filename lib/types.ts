export type User = {
  name: string;
  lastName: string;
  picture?: string;
  email: string;
  password: string;
};


export type authUser = {
  uid: string;
  displayName: string | null;
  photoURL?: string | null;
  email: string | null;
};
export type Location = {
  id: string;
  airport : string;
  average_cost: string;
  best_season: string;
  city: string;
  country: string;
  description: string;
  iata: string;
  icao: string;
  img: string;
  latitude: string;
  longitude: string;
  temperature: string;
  type: string;
}

export type Place = {
  name: string;
  address: string;
  rating: number | string;
};

export type SavedReservation = {
  id: string;
  bags: string;
  createdAt: string;
  destinationId: string;
  directOnly:boolean;
  from: string;
  fromIata: string;
  roundFlight: boolean;
  earliestDate: string;
  latestDate: string;
  maxNights:string;
  maxPrice: string;
  maxStepover: string;
  minNights: string;
  to: string;
  toIata: string;
  updatedAt: string;
  userEmail:string;
  userId: string
}