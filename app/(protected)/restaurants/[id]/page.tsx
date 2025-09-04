import { fetchMenuItems } from "@/hooks/restaurant/query";
import { MenuItem } from "@/lib/types";
import RestaurantDetail from "../components/restaurant-detail";
import { getUserData } from "@/lib/get-user-data";

interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}
export default async function RestaurantPage(props: RestaurantPageProps) {
  const { id } = await props.params;
  const { userRole, userCountry } = await getUserData();
  const menuItems = await fetchMenuItems(id);

  return (
    <RestaurantDetail
      menuItems={typeof menuItems === "string" ? [] : (menuItems as MenuItem[])}
      userRole={userRole}
      userCountry={userCountry}
    />
  );
}
