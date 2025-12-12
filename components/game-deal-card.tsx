"use client"

import { toggleFavoriteAction } from "@/app/actions/favorites"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { GameDealDTO } from "@/lib/deals-dal"
import { ExternalLink, Heart, Clock } from "lucide-react"
import Image from "next/image"
import { useTransition } from "react";
import Link from "next/link";

interface GameDealCardProps {
  game: GameDealDTO
  showFavoriteButton?: boolean
}

export default function GameDealCard({ game, showFavoriteButton = true }: GameDealCardProps) {
  const [isPending, startTransition] = useTransition()

  const bestDeal = game.deals.reduce((best, current) =>
    current.discountPercentage > best.discountPercentage ? current : best,
  )

  const handleToggleFavorite = () => {
    startTransition(() => {
      toggleFavoriteAction(game.id)
    })
  }

  const formatTimeLeft = (expiresAt: string | null) => {
    if (!expiresAt) return null

    const now = new Date()
    const expiry = new Date(expiresAt)
    const diff = expiry.getTime() - now.getTime()

    if (diff <= 0) return "Expired"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h left`
    return `${hours}h left`
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link href={{pathname: `/${game.platform}/infogame`, query: { id: game.id }}} >
        <Image
          src={game.imageUrl || "/placeholder.svg"}
          alt={game.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        </Link>
        {showFavoriteButton && (
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 ${game.isFavorite ? "text-red-500" : "text-gray-400"}`}
            onClick={handleToggleFavorite}
            disabled={isPending}
          >
            <Heart className={`h-5 w-5 ${game.isFavorite ? "fill-current" : ""}`} />
          </Button>
        )}
        <Badge className="absolute top-2 left-2 bg-red-600">-{bestDeal.discountPercentage.toFixed(1)}%</Badge>
      </div>

      <CardHeader>
        
        <Link href={{pathname: `/${game.platform}/infogame`, query: { id: game.id }}} >
          <CardTitle className="line-clamp-1">{game.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">{game.description}</CardDescription>
        <div className="flex gap-2">
          <Badge variant="secondary">{game.genre}</Badge>
          <Badge variant="outline">{game.platform}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          {game.deals.map((deal,index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="">
                <div className="font-medium">{deal.storeName}</div>
                <div className="items-center gap-2">
                  <span className="text-lg font-bold text-green-600">${deal.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  {deal.discountPercentage>0 ? 
                  <span className="text-sm text-gray-500 line-through pl-2">${deal.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                  : <span className="text-sm text-gray-500 line-through pl-2"></span>}
                  <Badge variant="destructive" className="text-xs w-[30%]">
                    -{deal.discountPercentage.toFixed(1)}%
                  </Badge>
                </div>
                {deal.expiresAt && (
                  <div className="flex items-center gap-1 text-xs text-orange-600">
                    <Clock className="h-3 w-3" />
                    {formatTimeLeft(deal.expiresAt)}
                  </div>
                )}
              </div>
              <div className="flex-1">
              <Button size="sm" asChild className="float-right bg-accent">
                <a href={deal.dealUrl} target="_blank" rel="noopener noreferrer" className="fill-current">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Comprar
                </a>
              </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
