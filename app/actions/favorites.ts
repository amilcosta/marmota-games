"use server"

import { toggleFavoriteDTO } from "@/lib/deals-dal"
import { revalidatePath } from "next/cache"

export async function toggleFavoriteAction(gameId: number) {
  try {
    const isFavorite = await toggleFavoriteDTO(gameId)
    revalidatePath("/")
    revalidatePath("/favorites")
    return { success: true, isFavorite }
  } catch (error) {
    return { error: "Failed to update favorite" }
  }
}
