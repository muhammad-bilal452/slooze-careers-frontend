"use client";

import { useState, useMemo } from "react";
import { RestaurantCard } from "@/components/restaurant-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin } from "lucide-react";
import { UserRole, Restaurant } from "@/lib/types";
import { AppSidebar } from "@/components/app-sidebar";
import { useToast } from "@/hooks/use-toast";

interface Props {
  restaurants: Restaurant[];
  userRole: UserRole | null;
  userCountry: string | null;
}

export default function RestaurantsGrid({
  restaurants,
  userRole,
  userCountry,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { toast } = useToast();

  if (!userCountry) {
    toast({
      title: "Error getting user country",
      variant: "destructive",
    });
    return;
  }
  const availableRestaurants = useMemo(() => {
    let result = restaurants;

    if (userRole !== UserRole.ADMIN) {
      result = result.filter(
        (r) => r.country.toLowerCase() === userCountry.toLowerCase()
      );
    }

    if (searchQuery) {
      result = result.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCountry) {
      result = result.filter(
        (r) => r.country.toLowerCase() === selectedCountry.toLowerCase()
      );
    }

    return result;
  }, [restaurants, searchQuery, selectedCountry, userRole, userCountry]);

  const countries = Array.from(new Set(restaurants.map((r) => r.country)));

  return (
    // <div className="flex min-h-screen w-full">
    //   <AppSidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
            <p className="text-muted-foreground">
              Browse and order from our partner restaurants
              {userRole !== UserRole.ADMIN && (
                <span className="ml-1">
                  in{" "}
                  <span className="font-medium text-primary">
                    {userCountry}
                  </span>
                </span>
              )}
            </p>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {userRole === UserRole.ADMIN && (
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="flex gap-2">
                    <Button
                      variant={selectedCountry === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCountry(null)}
                    >
                      All Countries
                    </Button>
                    {countries.map((country) => (
                      <Button
                        key={country}
                        variant={
                          selectedCountry === country ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCountry(country)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {country}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {availableRestaurants.length} found
              </Badge>
              {userRole !== UserRole.ADMIN && (
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 mr-1" />
                  {userCountry} only
                </Badge>
              )}
            </div>
          </div>

          {availableRestaurants.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <p className="text-lg font-medium">No restaurants found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>
    // </div>
  );
}
