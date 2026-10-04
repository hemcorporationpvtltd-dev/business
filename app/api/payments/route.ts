import { NextResponse } from "next/server";
import { COMPANY_DETAILS } from "@/lib/constants";
import { dbStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, method, transactionUtr } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Order ID required" }, { status: 400 });
    }

    const order = await dbStore.getOrderById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    if (method === "Direct Bank Transfer" && transactionUtr) {
      await dbStore.updateOrderStatus(orderId, "Processing", "Verified");
    }

    return NextResponse.json({
      success: true,
      message: "Payment details recorded securely",
      pnbAccount: COMPANY_DETAILS.bankDetails.accountNumber,
      ifsc: COMPANY_DETAILS.bankDetails.ifscCode,
      beneficiary: COMPANY_DETAILS.bankDetails.beneficiaryName,
      status: "Verified",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to record payment" },
      { status: 500 }
    );
  }
}
