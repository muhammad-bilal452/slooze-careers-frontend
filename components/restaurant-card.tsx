import type { Restaurant } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import Link from "next/link";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg flex items-center justify-center">
        <div className="text-4xl font-bold text-primary/30">
          {restaurant.name.charAt(0)}
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {restaurant.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {restaurant.country}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {restaurant.menuItems.length} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              <span>4.5</span>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={`/restaurants/${restaurant.id}`}>View Menu</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
