import { useAuth } from "../context/AuthContext";
import type { Car } from "../hooks/useCars";
import useCars from "../hooks/useCars";

export default function CarCard({
  car,
  rented = false,
}: {
  car: Car;
  rented?: boolean;
}) {
  const { user, token } = useAuth();
  const { refetch } = useCars(false);
  return (
    <div className="rounded border p-4 border-gray-300">
      <strong className="text-xl font-bold">
        [{car.brand}] {car.model}
      </strong>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-row gap-2">
          <strong>€/J:</strong>
          <span>{car.daily_price} €</span>
        </div>
        <div className="flex flex-row gap-2">
          <strong>Kilométrage:</strong>
          <span>{car.mileage} km</span>
        </div>
      </div>
      {user?.type === "rider" ? (
        <button
          className="p-2 mt-2 w-full text-center text-white bg-blue-500 rounded"
          onClick={async () => {
            fetch(
              `http://localhost:8000/api/car/${car.id}/${
                rented ? "un" : ""
              }rent_a_car/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then(async (res) => {
                if (!res.ok) {
                  throw new Error((await res.json()).message);
                }
                return res.json();
              })
              .then((data) => {
                refetch();
              })
              .catch((err) => {
                alert((err as Error).message);
              });
          }}
        >
          {rented ? "Rendre" : "Louer"}
        </button>
      ) : null}
    </div>
  );
}
