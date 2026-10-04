import { NextResponse } from "next/server";
import { dbStore } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    let products = await dbStore.getProducts();

    if (category && category !== "All") {
      products = products.filter((p) => p.category === category);
    }

    if (query) {
      const q = query.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("API Error in GET /api/products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.price || !body.category || !body.image) {
      return NextResponse.json(
        { success: false, error: "Missing required product fields" },
        { status: 400 }
      );
    }

    const created = await dbStore.addProduct({
      title: body.title,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : undefined,
      category: body.category,
      image: body.image,
      additionalImages: body.additionalImages || [],
      description: body.description || "",
      badge: body.badge || "100% Certified Leather",
      inStock: body.inStock !== false,
      isFeatured: Boolean(body.isFeatured),
      details: body.details || {
        material: "100% Certified Full-Grain Leather",
        dimensions: "Standard Artisan Dimensions",
        hardware: "Solid Antiqued Brass",
        warranty: "5-Year Craftsmanship Guarantee",
        origin: "Agra Atelier, India",
      },
    });

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error) {
    console.error("API Error in POST /api/products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
