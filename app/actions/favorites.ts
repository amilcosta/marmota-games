import { toggleFavoriteDTO } from "@/lib/deals-dal"
import { revalidatePath } from "next/cache"

export async function toggleFavoriteAction(gameId: number, platform: string) {
  try {
    return { success: true, isFavorite:true }
  } catch (error) {
    return { error: "Failed to update favorite"}
  }
}