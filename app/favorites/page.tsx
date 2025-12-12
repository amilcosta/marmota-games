import { getUserFavoritesDTO } from "@/lib/deals-dal"
import { getCurrentUser } from "@/lib/auth"
import GameDealCard from "@/components/game-deal-card"
import Navigation from "@/components/navigation"
import { redirect } from "next/navigation"

export default async function FavoritesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/signin")
  }

  const favoriteDeals = await getUserFavoritesDTO()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorite Deals</h1>
          <p className="text-gray-600">Keep track of the games you're interested in</p>
        </div>

        {favoriteDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't added any favorites yet.</p>
            <p className="text-gray-400 mt-2">Browse deals and click the heart icon to save them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDeals.map((game) => (
              <GameDealCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
