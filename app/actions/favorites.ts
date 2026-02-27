
export async function toggleFavoriteAction(gameId: number, platform: string) {
  try {
    return { success: true, isFavorite:true }
  } catch (error) {
    return { error: "Failed to update favorite"}
  }
}