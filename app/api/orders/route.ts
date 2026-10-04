import { NextResponse } from "next/server";
import { dbStore } from "@/lib/store";

export async function GET() {
  try {
    const orders = await dbStore.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to retrieve orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.address || !body.items?.length) {
      return NextResponse.json(
        { success: false, error: "Missing required order information" },
        { status: 400 }
      );
    }

    if (!body.unboxingVideoAgreed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Mandatory condition: Customer must agree to unboxing video requirement for return eligibility.",
        },
        { status: 400 }
      );
    }

    const order = await dbStore.createOrder({
      customerName: body.customerName,
      customerEmail: body.customerEmail || "customer@hemlifestyle.com",
      customerPhone: body.customerPhone,
      address: body.address,
      city: body.city || "Agra",
      state: body.state || "Uttar Pradesh",
      postalCode: body.postalCode || "283105",
      items: body.items,
      paymentMethod: body.paymentMethod || "Direct Bank Transfer",
      transactionUtr: body.transactionUtr,
      unboxingVideoAgreed: Boolean(body.unboxingVideoAgreed),
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
