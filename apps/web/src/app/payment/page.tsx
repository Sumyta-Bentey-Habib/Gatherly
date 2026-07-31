"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useAuth } from "@/src/app/hooks/useAuth";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useToast } from "@/src/context/Toast";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const toast = useToast();

  const eventId = searchParams.get("eventId") || "";
  const eventTitle = searchParams.get("eventTitle") || "Gatherly Event Ticket";
  const tickets = parseInt(searchParams.get("tickets") || "1", 10);
  const rawTotalAmount = parseInt(searchParams.get("totalAmount") || "1500", 10);

  // Active Tab: "cards" | "mobile"
  const [activeTab, setActiveTab] = useState<"cards" | "mobile">("cards");

  // Promo coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const calculatedDiscount = Math.round((rawTotalAmount * discountPercent) / 100);
  const finalTotalAmount = Math.max(0, rawTotalAmount - calculatedDiscount);

  // Card Inputs
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "amex" | "unknown">("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Mobile Banking Inputs (bKash, Nagad, Rocket, Upay)
  const [selectedMfs, setSelectedMfs] = useState<"bkash" | "nagad" | "rocket" | "upay">("bkash");
  const [mfsStep, setMfsStep] = useState<"number" | "otp" | "pin">("number");
  const [mfsNumber, setMfsNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [pinCode, setPinCode] = useState("");

  // Processing state
  const [processing, setProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("");
  const [txnId, setTxnId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      router.push("/");
    }
  }, [role, router]);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "GATHERLY10" || code === "WELCOME10") {
      setDiscountPercent(10);
      setAppliedCoupon(code);
      toast.success("10% promo discount applied!");
    } else if (code === "GATHERLY20") {
      setDiscountPercent(20);
      setAppliedCoupon(code);
      toast.success("20% VIP promo discount applied!");
    } else {
      toast.error("Invalid promo code. Try 'GATHERLY10'");
    }
  };

  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 16);
    setCardNumber(clean);

    if (clean.startsWith("4")) {
      setCardType("visa");
    } else if (clean.startsWith("5")) {
      setCardType("mastercard");
    } else if (clean.startsWith("3")) {
      setCardType("amex");
    } else {
      setCardType("unknown");
    }
  };

  const mfsDetails = {
    bkash: { name: "bKash", color: "#E2125B", bg: "bg-[#FFEBF0]", border: "border-[#E2125B]" },
    nagad: { name: "Nagad", color: "#F15A22", bg: "bg-[#FFF2EB]", border: "border-[#F15A22]" },
    rocket: { name: "Rocket", color: "#8C3494", bg: "bg-[#FAF0FC]", border: "border-[#8C3494]" },
    upay: { name: "Upay", color: "#00529C", bg: "bg-[#EBF4FF]", border: "border-[#00529C]" },
  };

  const handlePaymentSubmit = async () => {
    setProcessing(true);
    setProcessingMsg("Processing secure payment...");

    setTimeout(() => {
      setProcessingMsg("Verifying transaction...");

      setTimeout(async () => {
        try {
          if (eventId) {
            await fetch("/api/bookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                eventId,
                eventTitle,
                tickets,
                totalAmount: finalTotalAmount,
              }),
            });
          }

          const simulatedTxn = "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
          setTxnId(simulatedTxn);
          setPaymentSuccess(true);
          toast.success("Payment completed successfully!");
        } catch (e) {
          console.error(e);
          toast.error("Error creating booking.");
        } finally {
          setProcessing(false);
        }
      }, 1000);
    }, 1000);
  };

  if (paymentSuccess) {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-background px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 md:p-10 card-ambient max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">
            Payment Successful!
          </h1>
          <p className="text-on-surface-variant font-body-md text-body-md mb-6">
            Your booking for <strong className="text-on-surface">{eventTitle}</strong> is confirmed.
          </p>

          <div className="bg-surface-container-low rounded-2xl p-5 text-left mb-6 flex flex-col gap-3 font-body-md text-body-md">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <span className="text-on-surface-variant font-label-sm text-label-sm">Transaction ID</span>
              <span className="font-mono font-bold text-on-surface">{txnId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <span className="text-on-surface-variant font-label-sm text-label-sm">Payment Method</span>
              <span className="font-semibold text-on-surface capitalize">
                {activeTab === "cards" ? "Credit / Debit Card" : `${selectedMfs} Wallet`}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <span className="text-on-surface-variant font-label-sm text-label-sm">Tickets</span>
              <span className="font-semibold text-on-surface">{tickets} Ticket(s)</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-on-surface">Amount Paid</span>
              <span className="font-bold text-primary text-lg">BDT {finalTotalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/dashboard?section=bookings")}
              className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:bg-on-primary-container transition-colors font-semibold cursor-pointer"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push("/explore")}
              className="flex-1 bg-surface-container-low text-on-surface font-label-md text-label-md py-3 rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors font-semibold cursor-pointer"
            >
              Explore More Events
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-24 bg-background">
      {/* Processing Modal */}
      {processing && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-headline-md text-headline-md text-on-surface font-semibold">{processingMsg}</p>
          </div>
        </div>
      )}

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-primary font-label-md text-label-md font-semibold mb-4 hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Details
          </button>
          <h1 className="font-headline-lg text-headline-lg md:text-display-lg text-on-surface font-bold">
            Checkout & Payment
          </h1>
          <p className="text-on-surface-variant font-body-md text-body-md mt-1">
            Complete your booking securely using credit card or mobile banking.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 card-ambient flex flex-col gap-6">
            {/* Payment Method Selector Tabs */}
            <div className="flex bg-surface-container-low p-1.5 rounded-2xl gap-2">
              <button
                onClick={() => setActiveTab("cards")}
                className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "cards"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-lg">credit_card</span>
                Credit / Debit Card
              </button>
              <button
                onClick={() => setActiveTab("mobile")}
                className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "mobile"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-lg">phone_iphone</span>
                Mobile Banking
              </button>
            </div>

            {/* CARD FORM */}
            {activeTab === "cards" && (
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center pb-2 border-b border-outline-variant/20">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Enter Card Details
                  </h2>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant/20">
                    {cardType}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="card-number" className="font-label-sm text-label-sm text-on-surface-variant">
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    placeholder="4000 1234 5678 9010"
                    maxLength={16}
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="card-holder" className="font-label-sm text-label-sm text-on-surface-variant">
                    Cardholder Name
                  </label>
                  <input
                    id="card-holder"
                    type="text"
                    placeholder="e.g. Tanvir Ahmed"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="card-expiry" className="font-label-sm text-label-sm text-on-surface-variant">
                      Expiry Date
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length >= 3) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                        setCardExpiry(val.slice(0, 5));
                      }}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="card-cvv" className="font-label-sm text-label-sm text-on-surface-variant">
                      CVV Code
                    </label>
                    <input
                      id="card-cvv"
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface placeholder:text-outline-variant focus:ring-1 focus:ring-primary-container focus:bg-white transition-all font-body-md text-body-md"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePaymentSubmit}
                  disabled={!cardNumber || !cardHolder || !cardExpiry || !cardCvv}
                  className="w-full mt-2 bg-primary text-on-primary font-label-md text-label-md py-4 rounded-xl hover:bg-on-primary-container transition-colors font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Pay BDT {finalTotalAmount.toLocaleString()}
                </button>
              </div>
            )}

            {/* MOBILE BANKING FORM */}
            {activeTab === "mobile" && (
              <div className="flex flex-col gap-5">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold pb-2 border-b border-outline-variant/20">
                  Select Mobile Provider
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(Object.keys(mfsDetails) as Array<keyof typeof mfsDetails>).map((prov) => {
                    const info = mfsDetails[prov];
                    const isSelected = selectedMfs === prov;
                    return (
                      <button
                        key={prov}
                        onClick={() => {
                          setSelectedMfs(prov);
                          setMfsStep("number");
                        }}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                          isSelected ? `${info.border} ${info.bg}` : "border-outline-variant/30 bg-white hover:border-outline-variant"
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl" style={{ color: info.color }}>
                          account_balance_wallet
                        </span>
                        <span className="font-label-md text-label-md font-bold" style={{ color: isSelected ? info.color : "#171d1a" }}>
                          {info.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 flex flex-col gap-4">
                  <div className="text-center">
                    <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-outline-variant/20">
                      {selectedMfs.toUpperCase()} Sandbox Checkout
                    </span>
                  </div>

                  {mfsStep === "number" && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="mfs-number" className="font-label-sm text-label-sm text-on-surface-variant text-center">
                          Enter {selectedMfs.toUpperCase()} Mobile Number
                        </label>
                        <input
                          id="mfs-number"
                          type="text"
                          placeholder="017XXXXXXXX"
                          maxLength={11}
                          value={mfsNumber}
                          onChange={(e) => setMfsNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                          className="w-full bg-white border border-outline-variant/30 rounded-xl py-3 px-4 text-center font-mono font-bold text-lg text-on-surface focus:ring-1 focus:ring-primary-container transition-all"
                        />
                      </div>
                      <button
                        onClick={() => setMfsStep("otp")}
                        disabled={mfsNumber.length !== 11}
                        className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:bg-on-primary-container transition-colors font-semibold cursor-pointer disabled:opacity-50"
                      >
                        Send Verification Code
                      </button>
                    </div>
                  )}

                  {mfsStep === "otp" && (
                    <div className="flex flex-col gap-4 text-center">
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Enter code sent to <strong className="font-mono text-on-surface">{mfsNumber}</strong> (Hint: <strong className="text-primary font-mono">123456</strong>)
                      </p>
                      <input
                        type="text"
                        placeholder="1 2 3 4 5 6"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="w-full bg-white border border-outline-variant/30 rounded-xl py-3 px-4 text-center font-mono font-bold text-lg text-on-surface focus:ring-1 focus:ring-primary-container transition-all"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setMfsStep("number")}
                          className="flex-1 bg-white border border-outline-variant/30 text-on-surface py-3 rounded-xl font-semibold hover:bg-surface-container transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setMfsStep("pin")}
                          disabled={otpCode.length !== 6}
                          className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-semibold hover:bg-on-primary-container transition-colors disabled:opacity-50"
                        >
                          Verify OTP
                        </button>
                      </div>
                    </div>
                  )}

                  {mfsStep === "pin" && (
                    <div className="flex flex-col gap-4 text-center">
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Enter wallet PIN to confirm (Hint: <strong className="text-primary font-mono">1234</strong>)
                      </p>
                      <input
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full bg-white border border-outline-variant/30 rounded-xl py-3 px-4 text-center font-mono font-bold text-lg text-on-surface focus:ring-1 focus:ring-primary-container transition-all"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setMfsStep("otp")}
                          className="flex-1 bg-white border border-outline-variant/30 text-on-surface py-3 rounded-xl font-semibold hover:bg-surface-container transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePaymentSubmit}
                          disabled={pinCode.length !== 4}
                          className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-semibold hover:bg-on-primary-container transition-colors disabled:opacity-50"
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 card-ambient sticky top-28 flex flex-col gap-6">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold pb-3 border-b border-outline-variant/20 flex justify-between items-center">
              Booking Summary
              <span className="material-symbols-outlined text-primary">receipt</span>
            </h2>

            <div className="flex flex-col gap-3">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Event</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{eventTitle}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-outline-variant/20">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Tickets</span>
                <span className="font-body-md text-body-md font-bold text-on-surface">{tickets} Guest Ticket(s)</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Currency</span>
                <span className="font-body-md text-body-md font-bold text-on-surface">BDT</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="coupon-code" className="font-label-sm text-label-sm text-on-surface-variant">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon-code"
                  type="text"
                  placeholder="GATHERLY10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-surface-container-low border-none rounded-xl py-2.5 px-4 text-on-surface uppercase font-mono text-sm focus:ring-1 focus:ring-primary-container"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-secondary-container text-on-secondary-container font-label-md text-label-md px-4 py-2.5 rounded-xl font-bold hover:bg-secondary-fixed-dim transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <span className="text-xs font-semibold text-primary">
                  ✓ Promo code '{appliedCoupon}' applied (-{discountPercent}%)
                </span>
              )}
            </div>

            {/* Pricing Details */}
            <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col gap-3 font-body-md text-body-md">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-bold text-on-surface">BDT {rawTotalAmount.toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-primary font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>- BDT {calculatedDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-on-surface-variant">
                <span>Service Fee</span>
                <span className="font-bold text-primary">FREE</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20 font-bold text-on-surface text-lg">
                <span>Total Amount</span>
                <span className="text-primary">BDT {finalTotalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main className="min-h-screen pt-28 bg-background flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </main>
      }>
        <PaymentContent />
      </Suspense>
      <Footer />
    </>
  );
}
