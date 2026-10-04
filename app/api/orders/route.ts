import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
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
try {
  const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Hemlifestyle <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Order Received! 🚀',
      html: `
        <h2>Naya Order Mila Hai!</h2>
        <p><strong>Customer Name:</strong> ${body.customerName}</p>
        <p><strong>Phone Number:</strong> ${body.customerPhone}</p>
        <p><strong>Delivery Address:</strong> ${body.address}</p>
        <p>Sari details check karne ke liye apna Admin Dashboard kholein.</p>
      `,
    });
  } catch (emailError) {
    console.error("Email bhejne mein error aayi:", emailError);
  }
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
