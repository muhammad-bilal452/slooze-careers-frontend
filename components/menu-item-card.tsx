"use client"

import type { MenuItem } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface MenuItemCardProps {
  menuItem: MenuItem
  onAddToCart?: (menuItem: MenuItem) => void
}

export function MenuItemCard({ menuItem, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 rounded-t-lg flex items-center justify-center">
        <div className="text-2xl font-bold text-primary/30">{menuItem.name.charAt(0)}</div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base leading-tight">{menuItem.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              Delicious {menuItem.name.toLowerCase()} prepared with authentic ingredients and traditional recipes.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lg font-semibold text-primary">
              ${menuItem.price}
            </Badge>
          </div>
          <Button size="sm" onClick={() => onAddToCart?.(menuItem)} className="gap-1">
            <Plus className="h-3 w-3" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
