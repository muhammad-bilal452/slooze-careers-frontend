import { fetchRestaurants } from "@/hooks/restaurant/query";
import RestaurantsGrid from "./components/restaurant-grid";
import { getUserData } from "@/lib/get-user-data";

export default async function RestaurantsPage() {
  const { userRole, userCountry } = await getUserData();

  const restaurants = await fetchRestaurants();
  if (typeof restaurants === "string") {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-lg font-medium text-muted-foreground">
          {restaurants}
        </p>
      </main>
    );
  }

  return (
    <RestaurantsGrid
      restaurants={restaurants}
      userRole={userRole}
      userCountry={userCountry}
    />
  );
}
