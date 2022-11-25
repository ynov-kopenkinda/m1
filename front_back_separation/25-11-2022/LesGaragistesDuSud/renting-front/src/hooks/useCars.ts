import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { User } from "../context/AuthContext";

const API_URL = "http://localhost:8000/api";

export type Car = {
  id: number;
  brand: string;
  model: string;
  mileage: number;
  daily_price: number;
  rented_by: User | null;
  created_by: User | null;
};

export default function useCars(start: boolean, fullList = false) {
  const { token } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  console.log(cars);

  const getCars = async () => {
    const res = await fetch(
      `${API_URL}/car/get_all_cars${fullList ? "_with_rented" : ""}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      setCars(data);
    }
  };

  useEffect(() => {
    if (start) {
      getCars();
    }
  }, [token, start]);
  return { cars, refetch: () => getCars() };
}
