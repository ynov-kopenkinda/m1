import { IconFidgetSpinner, IconLogin, IconPlus } from "@tabler/icons";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useCars from "../hooks/useCars";
import router from "../router";

export default function CreateCarPage() {
  const { user, token } = useAuth();
  const { refetch } = useCars(false);
  const [loading, setLoading] = useState(false);
  if (!user || user.type !== "admin") {
    router.navigate({ to: "/login" });
    return null;
  }
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const carInfo = {
          brand: formData.get("brand"),
          model: formData.get("model"),
          mileage: parseInt(formData.get("mileage") as string),
          daily_price: parseInt(formData.get("daily_price") as string),
        };
        try {
          fetch("http://localhost:8000/api/car/add_a_car/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(carInfo),
          })
            .then(() => refetch())
            .then(() => router.navigate({ to: "/" }));
        } catch (e) {
          alert((e as Error).message);
        } finally {
          setLoading(false);
        }
      }}
    >
      <h2 className="text-3xl">Rajouter une voiture</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="brand">Marque</label>
        <input
          type="text"
          id="brand"
          name="brand"
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="model">Modèle</label>
        <input
          type="text"
          id="model"
          name="model"
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="mileage">Kilométrage</label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          className="p-2 border rounded"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="daily_price">Prix/Jour</label>
        <input
          type="number"
          id="daily_price"
          name="daily_price"
          className="p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 font-bold rounded w-fit text-white flex gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={loading}
      >
        Créer
        {loading ? (
          <IconFidgetSpinner className="animate-spin" />
        ) : (
          <IconPlus />
        )}
      </button>
    </form>
  );
}
