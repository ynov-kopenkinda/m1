import { IconLogin, IconSearch } from "@tabler/icons";
import { useState } from "react";
import CarCard from "../components/CarCard";
import { useAuth } from "../context/AuthContext";
import useCars from "../hooks/useCars";
import router from "../router";

export default function RentedCars() {
  const { loggedIn } = useAuth();
  const { cars } = useCars(loggedIn === "yes", true);
  const [search, setSearch] = useState("");
  if (loggedIn === "no") {
    return (
      <div className="text-center flex flex-col gap-4">
        <strong className="text-2xl font-bold">Vous n'êtes pas connecté</strong>
        <router.Link
          to="/login"
          className="transition-all gap-2 flex items-center justify-center text-blue-500 border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white"
        >
          Log in
          <IconLogin size={16} stroke={1.5} />
        </router.Link>
      </div>
    );
  }
  return (
    <div className="rounded border p-4 border-gray-300">
      <strong className="text-2xl font-bold">Liste des voitures</strong>
      <div className="my-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className='flex items-center gap-1'>
            <IconSearch size={16} /> Rechercher
          </label>
          <input
            type="search"
            id="search"
            name="search"
            className="p-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {cars
          .filter(
            (car) =>
              search === "" ||
              `${car.brand} ${car.model}`.toLocaleLowerCase().includes(search)
          )
          .map((car) => (
            <CarCard car={car} key={car.id} rented />
          ))}
      </div>
    </div>
  );
}
