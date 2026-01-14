import { NextResponse } from "next/server";
import {getCompareGameDTO} from "@/lib/compare-search";

const products = [
    { id: "1", name: "iPhone 15", price: 999, brand: "Apple", rating: 4.8 },
    { id: "2", name: "Galaxy S24", price: 899, brand: "Samsung", rating: 4.7 },
    { id: "3", name: "Pixel 8", price: 799, brand: "Google", rating: 4.6 }
];

export async function GET(req: Request) {
    

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    const games = await getCompareGameDTO(query);
    const results = games.filter(p =>
        p.title.toLowerCase().includes(query)
    );

    return NextResponse.json(results);
}