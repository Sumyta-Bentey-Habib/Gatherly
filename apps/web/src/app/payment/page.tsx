"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/src/app/hooks/useAuth";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { useToast } from "@/src/context/Toast";
import {
  SuccessContainer,
  SuccessCard,
  CheckCircle,
  PageTitle,
  SuccessReceipt,
  ReceiptRow,
  ReceiptLabel,
  ReceiptVal,
  ActionButtonGroup,
  PrimaryBtn,
  SecondaryBtn,
  PaymentContainer,
  ProcessingOverlay,
  LoaderWrapper,
  Spinner,
  ProcessingMsg,
  GridWrapper,
  BreadcrumbButton,
  PageSubtitle,
  ContentLayout,
  PaymentFormPanel,
  TabHeader,
  TabButton,
  TabTitle,
  CardPreview,
  CardHeader,
  CardSystemLabel,
  CardBrand,
  CardNumberDisplay,
  CardFooter,
  CardHolderBlock,
  CardDetailLabel,
  CardDetailValue,
  CardFieldsGrid,
  FieldWrapper,
  FieldLabel,
  FieldInput,
  PayButton,
  ProviderGrid,
  ProviderBtn,
  MobileFormWrapper,
  ProviderBadgeWrapper,
  ProviderBadge,
  ButtonGroup,
  SummaryCard,
  SummaryHeader,
  SummaryTourTitle,
  DetailRow,
  DetailCell,
  DetailLabel,
  DetailVal,
  CostBox,
  CostRow,
  CostTotalRow
} from "./payment.styles";

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const toast = useToast();

  const eventId = searchParams.get("eventId") || "";
  const eventTitle = searchParams.get("eventTitle") || "";
  const tickets = parseInt(searchParams.get("tickets") || "1", 10);
  const totalAmount = parseInt(searchParams.get("totalAmount") || "0", 10);

  // Active Tab: "cards" | "mobile" | "internet"
  const [activeTab, setActiveTab] = useState<"cards" | "mobile" | "internet">("cards");

  // Input states
  const [selectedMobile, setSelectedMobile] = useState<"bkash" | "nagad" | "rocket" | "upay">("bkash");
  const [mobileStep, setMobileStep] = useState<"number" | "otp" | "pin">("number");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [cardType, setCardType] = useState<"visa" | "mastercard" | "amex" | "unknown">("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [bankUsername, setBankUsername] = useState("");
  const [bankPassword, setBankPassword] = useState("");
  const [bankStep, setBankStep] = useState<"select" | "login">("select");

  // Payment progress states
  const [processing, setProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("");
  const [txnId, setTxnId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Redirect to home if user is an admin or no event details
    if (role === "admin") {
      router.push("/");
      return;
    }
    if (!eventId || totalAmount <= 0) {
      router.push("/");
    }
  }, [eventId, totalAmount, role, router]);

  // Card type detector based on first digit
  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, "");
    setCardNumber(clean.slice(0, 16));

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

  const handleMobileNumberChange = (val: string) => {
    setMobileNumber(val.replace(/\D/g, "").slice(0, 11));
  };

  const handleOtpChange = (val: string) => {
    setOtpCode(val.replace(/\D/g, "").slice(0, 6));
  };

  const handlePinChange = (val: string) => {
    setPinCode(val.replace(/\D/g, "").slice(0, 4));
  };

  const formatCardNumber = (num: string) => {
    const chunks = num.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : num;
  };

  const mobileProviderDetails = {
    bkash: { label: "bKash", color: "#E2125B", bg: "#FFEBF0" },
    nagad: { label: "Nagad", color: "#F15A22", bg: "#FFF2EB" },
    rocket: { label: "Rocket", color: "#8C3494", bg: "#FAF0FC" },
    upay: { label: "Upay", color: "#00529C", bg: "#EBF4FF" },
  };

  // Perform checkout
  const handlePaymentSubmit = async () => {
    setProcessing(true);
    setProcessingMsg("Contacting secure merchant server...");

    setTimeout(() => {
      setProcessingMsg("Authorizing secure transaction with bank gateway...");

      setTimeout(() => {
        setProcessingMsg("Processing payment authorization code...");

        setTimeout(async () => {
          try {
            // Call backend API to record the booking
            const res = await fetch("/api/bookings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                eventId,
                eventTitle,
                tickets,
                totalAmount,
              }),
            });

            if (res.ok) {
              const data = await res.json();
              const simulatedTxn = "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
              setTxnId(simulatedTxn);
              setPaymentSuccess(true);
              toast.success("Payment completed successfully!");
            } else {
              toast.error("Payment failed on backend: Booking could not be created.");
            }
          } catch (e) {
            console.error(e);
            toast.error("Network error: Could not complete booking.");
          } finally {
            setProcessing(false);
          }
        }, 1000);
      }, 1000);
    }, 1000);
  };

  if (paymentSuccess) {
    return (
      <SuccessContainer>
        <SuccessCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated checkmark */}
          <CheckCircle>
            <span className="material-symbols-outlined">check</span>
          </CheckCircle>

          <PageTitle style={{ fontSize: "24px", marginBottom: "8px" }}>
            Payment Successful!
          </PageTitle>
          <p style={{ color: "rgba(25, 28, 29, 0.8)", fontSize: "14px", marginBottom: "24px" }}>
            Your booking for <strong style={{ color: "#000000" }}>{eventTitle}</strong> has been secured.
          </p>

          {/* Receipt details */}
          <SuccessReceipt>
            <ReceiptRow>
              <ReceiptLabel>Transaction ID:</ReceiptLabel>
              <ReceiptVal>{txnId}</ReceiptVal>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Payment Type:</ReceiptLabel>
              <ReceiptVal style={{ textTransform: "uppercase" }}>
                {activeTab === "cards" ? "Credit Card" : activeTab === "mobile" ? `${selectedMobile} mobile` : "Net Banking"}
              </ReceiptVal>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Attendee:</ReceiptLabel>
              <ReceiptVal>{user?.name || "Premium User"}</ReceiptVal>
            </ReceiptRow>
            <ReceiptRow>
              <ReceiptLabel>Total Tickets:</ReceiptLabel>
              <ReceiptVal>{tickets} ticket(s)</ReceiptVal>
            </ReceiptRow>
            <ReceiptRow style={{ borderTop: "1px solid rgba(196, 199, 199, 0.2)", paddingTop: "12px", fontWeight: "bold", fontSize: "14px", color: "#000000" }}>
              <ReceiptLabel style={{ opacity: 1 }}>Amount Paid:</ReceiptLabel>
              <span style={{ color: "#705d00" }}>BDT {totalAmount.toLocaleString()}</span>
            </ReceiptRow>
          </SuccessReceipt>

          <ActionButtonGroup>
            <PrimaryBtn
              onClick={() => router.push("/dashboard?section=bookings")}
              style={{ flex: "none", padding: "14px 28px" }}
            >
              Go to Dashboard
            </PrimaryBtn>
            <SecondaryBtn
              onClick={() => router.push("/")}
              style={{ flex: "none", padding: "14px 28px" }}
            >
              Return Home
            </SecondaryBtn>
          </ActionButtonGroup>
        </SuccessCard>
      </SuccessContainer>
    );
  }

  return (
    <PaymentContainer>
      {/* Processing Loader Overlay */}
      <AnimatePresence>
        {processing && (
          <ProcessingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoaderWrapper>
              <Spinner />
              <ProcessingMsg>
                {processingMsg}
              </ProcessingMsg>
            </LoaderWrapper>
          </ProcessingOverlay>
        )}
      </AnimatePresence>

      <GridWrapper>
        {/* Breadcrumb / Title */}
        <div style={{ marginBottom: "32px", userSelect: "none" }}>
          <BreadcrumbButton onClick={() => router.back()}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Event Details
          </BreadcrumbButton>
          <PageTitle>
            Checkout Securely
          </PageTitle>
          <PageSubtitle>
            SSLCommerz Dummy Sandbox Gateway
          </PageSubtitle>
        </div>

        <ContentLayout>
          {/* Left Column - Payment Tabs */}
          <PaymentFormPanel>
            <TabHeader>
              <TabButton
                onClick={() => setActiveTab("cards")}
                $active={activeTab === "cards"}
              >
                <span className="material-symbols-outlined">credit_card</span>
                Cards
              </TabButton>
              <TabButton
                onClick={() => setActiveTab("mobile")}
                $active={activeTab === "mobile"}
              >
                <span className="material-symbols-outlined">phone_iphone</span>
                Mobile Banking
              </TabButton>
              <TabButton
                onClick={() => setActiveTab("internet")}
                $active={activeTab === "internet"}
              >
                <span className="material-symbols-outlined">language</span>
                Net Banking
              </TabButton>
            </TabHeader>

            {/* TAB CONTENT: CARDS */}
            {activeTab === "cards" && (
              <div>
                <TabTitle>Enter Card Details</TabTitle>

                {/* Mock Card Preview */}
                <CardPreview>
                  <CardHeader>
                    <CardSystemLabel>Gatherly Card</CardSystemLabel>
                    {cardType === "visa" && <CardBrand $brandColor="#2A52BE">VISA</CardBrand>}
                    {cardType === "mastercard" && <CardBrand $brandColor="#E52A2D">MasterCard</CardBrand>}
                    {cardType === "amex" && <CardBrand $brandColor="#007BC4">AMEX</CardBrand>}
                    {cardType === "unknown" && <CardSystemLabel style={{ opacity: 0.4 }}>CARD</CardSystemLabel>}
                  </CardHeader>
                  <CardNumberDisplay>
                    {cardNumber ? formatCardNumber(cardNumber) : "•••• •••• •••• ••••"}
                  </CardNumberDisplay>
                  <CardFooter>
                    <CardHolderBlock>
                      <CardDetailLabel>Card Holder</CardDetailLabel>
                      <CardDetailValue>{cardHolder || "ATTENDEE NAME"}</CardDetailValue>
                    </CardHolderBlock>
                    <div>
                      <CardDetailLabel>Expires</CardDetailLabel>
                      <CardDetailValue>{cardExpiry || "MM/YY"}</CardDetailValue>
                    </div>
                  </CardFooter>
                </CardPreview>

                {/* Form fields */}
                <CardFieldsGrid>
                  <FieldWrapper>
                    <FieldLabel>Card Number</FieldLabel>
                    <FieldInput
                      type="text"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <FieldLabel>Card Holder Name</FieldLabel>
                    <FieldInput
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Marcus Chen"
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <FieldLabel>Expiration Date</FieldLabel>
                    <FieldInput
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                      placeholder="MM/YY"
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <FieldLabel>CVV</FieldLabel>
                    <FieldInput
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      placeholder="•••"
                    />
                  </FieldWrapper>
                </CardFieldsGrid>

                <PayButton
                  onClick={handlePaymentSubmit}
                  disabled={!cardNumber || !cardHolder || !cardExpiry || !cardCvv}
                >
                  Pay BDT {totalAmount.toLocaleString()} Securely
                </PayButton>
              </div>
            )}

            {/* TAB CONTENT: MOBILE BANKING */}
            {activeTab === "mobile" && (
              <div>
                <TabTitle>Select Mobile Provider</TabTitle>

                {/* Mobile provider buttons */}
                <ProviderGrid>
                  {(Object.keys(mobileProviderDetails) as Array<keyof typeof mobileProviderDetails>).map((prov) => {
                    const info = mobileProviderDetails[prov];
                    return (
                      <ProviderBtn
                        key={prov}
                        onClick={() => {
                          setSelectedMobile(prov);
                          setMobileStep("number");
                        }}
                        $selected={selectedMobile === prov}
                        $brandColor={info.color}
                        $bgColor={info.bg}
                      >
                        <span>{info.label}</span>
                      </ProviderBtn>
                    );
                  })}
                </ProviderGrid>

                {/* Mobile Sub-views */}
                <MobileFormWrapper>
                  <ProviderBadgeWrapper>
                    <ProviderBadge>
                      {selectedMobile} sandbox checkout
                    </ProviderBadge>
                  </ProviderBadgeWrapper>

                  {mobileStep === "number" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <FieldWrapper>
                        <FieldLabel style={{ textAlign: "left" }}>
                          {selectedMobile} Wallet Number
                        </FieldLabel>
                        <FieldInput
                          type="text"
                          value={mobileNumber}
                          onChange={(e) => handleMobileNumberChange(e.target.value)}
                          placeholder="017xxxxxxxx"
                          style={{ textAlign: "center", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "0.1em" }}
                        />
                      </FieldWrapper>
                      <PrimaryBtn
                        onClick={() => setMobileStep("otp")}
                        disabled={mobileNumber.length !== 11}
                        style={{ width: "100%" }}
                      >
                        Send Verification Code
                      </PrimaryBtn>
                    </div>
                  )}

                  {mobileStep === "otp" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(25, 28, 29, 0.8)" }}>
                        Verification code sent to <strong style={{ fontFamily: "monospace" }}>{mobileNumber}</strong>. (Hint: Enter <strong style={{ fontFamily: "monospace" }}>123456</strong>)
                      </p>
                      <FieldWrapper>
                        <FieldInput
                          type="text"
                          value={otpCode}
                          onChange={(e) => handleOtpChange(e.target.value)}
                          placeholder="••••••"
                          style={{ textAlign: "center", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "0.15em" }}
                        />
                      </FieldWrapper>
                      <ButtonGroup>
                        <SecondaryBtn
                          onClick={() => setMobileStep("number")}
                        >
                          Back
                        </SecondaryBtn>
                        <PrimaryBtn
                          onClick={() => setMobileStep("pin")}
                          disabled={otpCode.length !== 6}
                        >
                          Verify OTP
                        </PrimaryBtn>
                      </ButtonGroup>
                    </div>
                  )}

                  {mobileStep === "pin" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(25, 28, 29, 0.8)" }}>
                        Enter wallet PIN to confirm. (Hint: Enter <strong style={{ fontFamily: "monospace" }}>1234</strong>)
                      </p>
                      <FieldWrapper>
                        <FieldInput
                          type="password"
                          value={pinCode}
                          onChange={(e) => handlePinChange(e.target.value)}
                          placeholder="••••"
                          style={{ textAlign: "center", fontFamily: "monospace", fontWeight: "bold", letterSpacing: "0.15em" }}
                        />
                      </FieldWrapper>
                      <ButtonGroup>
                        <SecondaryBtn
                          onClick={() => setMobileStep("otp")}
                        >
                          Back
                        </SecondaryBtn>
                        <PrimaryBtn
                          onClick={handlePaymentSubmit}
                          disabled={pinCode.length !== 4}
                        >
                          Confirm Pay
                        </PrimaryBtn>
                      </ButtonGroup>
                    </div>
                  )}
                </MobileFormWrapper>
              </div>
            )}

            {/* TAB CONTENT: NET BANKING */}
            {activeTab === "internet" && (
              <div>
                <TabTitle>Select Internet Bank</TabTitle>

                {bankStep === "select" && (
                  <ProviderGrid>
                    {[
                      { id: "brac", name: "BRAC Bank" },
                      { id: "city", name: "City Bank" },
                      { id: "islamic", name: "Islami Bank" },
                      { id: "mtb", name: "Mutual Trust" },
                    ].map((b) => (
                      <ProviderBtn
                        key={b.id}
                        onClick={() => {
                          setSelectedBank(b.name);
                          setBankStep("login");
                        }}
                        $selected={false}
                        $brandColor="#000000"
                        $bgColor="transparent"
                        style={{ height: "80px" }}
                      >
                        <span style={{ fontSize: "12px" }}>{b.name}</span>
                      </ProviderBtn>
                    ))}
                  </ProviderGrid>
                )}

                {bankStep === "login" && selectedBank && (
                  <MobileFormWrapper>
                    <ProviderBadgeWrapper>
                      <ProviderBadge>
                        {selectedBank} Portal Login
                      </ProviderBadge>
                    </ProviderBadgeWrapper>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <FieldWrapper>
                        <FieldLabel>Username</FieldLabel>
                        <FieldInput
                          type="text"
                          value={bankUsername}
                          onChange={(e) => setBankUsername(e.target.value)}
                          placeholder="marcus_chen"
                        />
                      </FieldWrapper>
                      <FieldWrapper>
                        <FieldLabel>Password</FieldLabel>
                        <FieldInput
                          type="password"
                          value={bankPassword}
                          onChange={(e) => setBankPassword(e.target.value)}
                          placeholder="••••••••"
                        />
                      </FieldWrapper>
                      <ButtonGroup style={{ marginTop: "8px" }}>
                        <SecondaryBtn
                          onClick={() => {
                            setBankStep("select");
                            setSelectedBank(null);
                          }}
                        >
                          Cancel
                        </SecondaryBtn>
                        <PrimaryBtn
                          onClick={handlePaymentSubmit}
                          disabled={!bankUsername || !bankPassword}
                        >
                          Login & Pay
                        </PrimaryBtn>
                      </ButtonGroup>
                    </div>
                  </MobileFormWrapper>
                )}
              </div>
            )}
          </PaymentFormPanel>

          {/* Right Column - Booking Summary Card */}
          <SummaryCard>
            <SummaryHeader>Booking Summary</SummaryHeader>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#526069", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: "bold", display: "block" }}>
                  Event Ticket
                </span>
                <SummaryTourTitle>{eventTitle}</SummaryTourTitle>
              </div>

              <DetailRow>
                <DetailCell>
                  <DetailLabel>Tickets</DetailLabel>
                  <DetailVal>{tickets} ticket(s)</DetailVal>
                </DetailCell>
              </DetailRow>

              <CostBox>
                <CostRow>
                  <span>Booking Subtotal:</span>
                  <span style={{ color: "#000000", fontWeight: "bold" }}>BDT {(totalAmount * 0.96).toLocaleString()}</span>
                </CostRow>
                <CostRow>
                  <span>Eco-Tax & Service (4%):</span>
                  <span style={{ color: "#000000", fontWeight: "bold" }}>BDT {(totalAmount * 0.04).toLocaleString()}</span>
                </CostRow>
                <CostTotalRow>
                  <span>Total Amount:</span>
                  <span style={{ color: "#705d00" }}>BDT {totalAmount.toLocaleString()}</span>
                </CostTotalRow>
              </CostBox>
            </div>
          </SummaryCard>
        </ContentLayout>
      </GridWrapper>
    </PaymentContainer>
  );
}

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <main style={{ minHeight: "100vh", paddingTop: "72px", backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "32px", height: "32px", border: "4px solid #000000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </main>
      }>
        <PaymentContent />
      </Suspense>
      <Footer />
    </>
  );
}
