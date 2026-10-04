"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { X, Printer, Download, CheckCircle2, ShieldCheck } from "lucide-react";
import { Order } from "@/types";
import { COMPANY_DETAILS } from "@/lib/constants";

interface Props {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ order, isOpen, onClose }: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  // Tax calculations
  // In India GST for leather goods is 18% inclusive
  const subtotalBeforeTax = Math.round((order.subtotal / 1.18) * 100) / 100;
  const isInterState = order.state && order.state.toLowerCase() !== "uttar pradesh";
  const igst = isInterState ? Math.round((order.subtotal - subtotalBeforeTax) * 100) / 100 : 0;
  const cgst = !isInterState ? Math.round(((order.subtotal - subtotalBeforeTax) / 2) * 100) / 100 : 0;
  const sgst = !isInterState ? cgst : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-amber-500/40 rounded-2xl shadow-2xl text-neutral-100 my-8 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0c10] print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono text-amber-400">
              Tax Invoice #{order.orderNumber}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div
          ref={invoiceRef}
          className="p-6 sm:p-10 bg-white text-neutral-900 print:p-0 print:m-0 print:w-full print:text-black"
          id="invoice-content"
        >
          {/* Company & Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-neutral-900 pb-6">
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-black rounded p-0.5 shrink-0">
                  <Image
                    src="/logo-mark.png"
                    alt="HL Monogram"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-widest text-black uppercase font-serif">
                    HEMLIFESTYLE
                  </h1>
                  <p className="text-[11px] font-semibold text-neutral-700">
                    {COMPANY_DETAILS.legalName}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-neutral-600 space-y-0.5 pt-2">
                <p>Proprietor: <strong className="text-neutral-900">{COMPANY_DETAILS.owner}</strong></p>
                <p>{COMPANY_DETAILS.registeredAddress.line1}, {COMPANY_DETAILS.registeredAddress.line2}</p>
                <p>{COMPANY_DETAILS.registeredAddress.city}, {COMPANY_DETAILS.registeredAddress.state} - {COMPANY_DETAILS.registeredAddress.pincode}</p>
                <p>GSTIN: <strong className="text-neutral-900 font-mono">{COMPANY_DETAILS.gstin}</strong></p>
                <p>Email: {COMPANY_DETAILS.contact.email} | Phone: {COMPANY_DETAILS.contact.phone}</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 sm:self-start">
              <div className="inline-block bg-neutral-900 text-amber-400 text-xs font-mono uppercase tracking-widest px-3 py-1 font-bold">
                ORIGINAL TAX INVOICE
              </div>
              <p className="text-sm font-bold text-neutral-900 pt-1">
                Invoice No: <span className="font-mono">{order.orderNumber}</span>
              </p>
              <p className="text-xs text-neutral-600">
                Date: {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs text-neutral-600">
                Payment Method: <strong className="text-neutral-900">{order.paymentMethod}</strong>
              </p>
              {order.transactionUtr && (
                <p className="text-xs text-neutral-600">
                  Transaction UTR: <span className="font-mono font-bold text-neutral-900">{order.transactionUtr}</span>
                </p>
              )}
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: {order.paymentStatus.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Billed To / Shipped To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-neutral-300 text-xs">
            <div>
              <p className="text-[10px] uppercase font-mono font-bold text-neutral-500 tracking-wider mb-1">
                Billed &amp; Shipped To
              </p>
              <p className="font-bold text-sm text-neutral-900">{order.customerName}</p>
              <p className="text-neutral-700">{order.address}</p>
              <p className="text-neutral-700">
                {order.city}, {order.state || "Uttar Pradesh"} - {order.postalCode}
              </p>
              <p className="text-neutral-700">Phone: {order.customerPhone}</p>
              <p className="text-neutral-700">Email: {order.customerEmail}</p>
            </div>

            <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 space-y-1">
              <p className="text-[10px] uppercase font-mono font-bold text-neutral-500 tracking-wider">
                Official Bank Settlement Record
              </p>
              <p className="text-neutral-800 text-[11px]">
                Beneficiary: <strong>{COMPANY_DETAILS.bankDetails.beneficiaryName}</strong>
              </p>
              <p className="text-neutral-800 text-[11px]">
                Bank: <strong>{COMPANY_DETAILS.bankDetails.bankName}</strong> ({COMPANY_DETAILS.bankDetails.accountType})
              </p>
              <p className="text-neutral-800 text-[11px] font-mono">
                A/C No: <strong>{COMPANY_DETAILS.bankDetails.accountNumber}</strong>
              </p>
              <p className="text-neutral-800 text-[11px] font-mono">
                IFSC: <strong>{COMPANY_DETAILS.bankDetails.ifscCode}</strong>
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-neutral-900 text-[11px] uppercase tracking-wider text-neutral-600">
                  <th className="py-2">Item Description</th>
                  <th className="py-2">HSN</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Taxable Val</th>
                  <th className="py-2 text-right">Total (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="py-3">
                    <td className="py-3 pr-2">
                      <p className="font-bold text-neutral-900">{item.product.title}</p>
                      <p className="text-[10px] text-neutral-500">
                        {item.product.category} &bull; 100% Genuine Full-Grain Leather
                      </p>
                    </td>
                    <td className="py-3 font-mono text-neutral-600">
                      {item.product.category.includes("Jacket") ? "4203" : "4202"}
                    </td>
                    <td className="py-3 text-center font-bold text-neutral-900">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right font-mono text-neutral-700">
                      ₹{Math.round(((item.product.price * item.quantity) / 1.18)).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 text-right font-bold font-mono text-neutral-900">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Breakdown & Grand Total */}
          <div className="border-t-2 border-neutral-900 pt-4 flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="text-[11px] text-neutral-500 max-w-sm space-y-1">
              <p className="font-semibold text-neutral-800">
                100% Certified Full-Grain Leather Guarantee
              </p>
              <p>
                Includes 5-Year Artisan Stitching &amp; Leather Warranty from HEM Corporation pvt Ltd.
                Returns permitted solely for defective items verified with sealed unboxing video.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Taxable Amount:</span>
                <span className="font-mono">₹{subtotalBeforeTax.toLocaleString("en-IN")}</span>
              </div>
              {isInterState ? (
                <div className="flex justify-between text-neutral-600">
                  <span>IGST (18%):</span>
                  <span className="font-mono">₹{igst.toLocaleString("en-IN")}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-neutral-600">
                    <span>CGST (9%):</span>
                    <span className="font-mono">₹{cgst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>SGST (9%):</span>
                    <span className="font-mono">₹{sgst.toLocaleString("en-IN")}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Luxury Shipping:</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-neutral-900 border-t border-neutral-300 pt-2">
                <span>Total Amount:</span>
                <span className="font-mono text-base">₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Signature & Footer */}
          <div className="mt-10 pt-8 border-t border-neutral-300 flex justify-between items-end">
            <div className="text-[10px] text-neutral-400">
              <p>Computer generated tax invoice from HEM Corporation pvt Ltd.</p>
              <p>Agra, Uttar Pradesh &bull; CIN: {COMPANY_DETAILS.cin}</p>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-base text-neutral-900">
                Kapil Chahar
              </div>
              <div className="border-t border-neutral-400 mt-1 pt-1 text-[10px] uppercase font-mono text-neutral-600">
                Authorized Signatory
                <br />
                HEM Corporation pvt Ltd
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
