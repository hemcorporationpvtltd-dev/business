export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", receipt, notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order amount" },
        { status: 400 }
      );
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // If production / live keys are provided, call Razorpay API directly
    if (key_secret && key_id !== "rzp_test_placeholder") {
      const razorpay = new Razorpay({
        key_id,
        key_secret,
      });

      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // amount in lowest currency unit (paise)
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {},
      });

      return NextResponse.json({
        success: true,
        order,
        keyId: key_id,
      });
    }

    // Standard dev/preview simulated order object for seamless frontend modal testing
    const simulatedOrderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      success: true,
      order: {
        id: simulatedOrderId,
        entity: "order",
        amount: Math.round(amount * 100),
        amount_paid: 0,
        amount_due: Math.round(amount * 100),
        currency: "INR",
        receipt: receipt || `rcpt_${Date.now()}`,
        status: "created",
        attempts: 0,
        notes: notes || {},
        created_at: Math.floor(Date.now() / 1000),
      },
      keyId: key_id,
      isSimulated: true,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to initialize Razorpay order" },
      { status: 500 }
    );
  }
}
