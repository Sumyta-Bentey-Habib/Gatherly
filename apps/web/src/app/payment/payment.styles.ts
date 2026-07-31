"use client";

import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const floatGlow = keyframes`
  0% { transform: translateY(0px); box-shadow: 0 20px 40px rgba(0, 64, 45, 0.2); }
  50% { transform: translateY(-4px); box-shadow: 0 25px 50px rgba(0, 64, 45, 0.28); }
  100% { transform: translateY(0px); box-shadow: 0 20px 40px rgba(0, 64, 45, 0.2); }
`;

export const PaymentContainer = styled.main`
  min-height: 100vh;
  background: radial-gradient(circle at 10% 10%, rgba(0, 108, 77, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 90% 90%, rgba(62, 180, 137, 0.08) 0%, transparent 40%),
              #f6faf7;
  color: #171d1a;
  padding-top: 100px;
  padding-bottom: 96px;
  font-family: 'Inter', sans-serif;
`;

export const GridWrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const TopNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #006c4d;
  background: #ffffff;
  border: 1px solid rgba(0, 108, 77, 0.18);
  padding: 10px 18px;
  border-radius: 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 108, 77, 0.04);
  transition: all 0.2s ease;

  &:hover {
    background: #006c4d;
    color: #ffffff;
    border-color: #006c4d;
    transform: translateX(-3px);
  }

  .material-symbols-outlined {
    font-size: 18px;
  }
`;

export const SecurityPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(0, 108, 77, 0.08);
  border: 1px solid rgba(0, 108, 77, 0.15);
  border-radius: 24px;
  font-size: 12px;
  font-weight: 700;
  color: #006c4d;

  .material-symbols-outlined {
    font-size: 16px;
  }
`;

export const MainSplitLayout = styled.div`
  display: grid;
  grid-template-cols: 1fr;
  gap: 32px;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-cols: 5fr 7fr;
  }
`;

// LEFT SIDE: Dark Luxury Event Showcase
export const EventSummaryCard = styled.div`
  background: linear-gradient(155deg, #05241b 0%, #003d2b 55%, #001b11 100%);
  border-radius: 28px;
  padding: 32px;
  color: #ffffff;
  box-shadow: 0 24px 60px rgba(0, 33, 21, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    position: sticky;
    top: 110px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -40%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(134, 248, 200, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const SummaryBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(134, 248, 200, 0.15);
  border: 1px solid rgba(134, 248, 200, 0.3);
  color: #86f8c8;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
`;

export const EventTitle = styled.h2`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-cols: 1fr 1fr;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
`;

export const DetailValue = styled.span`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;

// Dark Glass Coupon
export const DarkCouponBox = styled.div`
  margin-bottom: 24px;
`;

export const DarkCouponRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
`;

export const DarkCouponInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px 14px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  outline: none;

  &:focus {
    border-color: #86f8c8;
    background: rgba(255, 255, 255, 0.12);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const DarkCouponBtn = styled.button`
  background: #3eb489;
  color: #002115;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 800;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #86f8c8;
  }
`;

export const PricingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 18px;
  padding: 18px;
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
`;

export const TotalPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #86f8c8;
`;

// RIGHT SIDE: White Modern Checkout Form Panel
export const CheckoutPanel = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 108, 77, 0.12);
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0, 40, 29, 0.06);

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

export const FormTitle = styled.h3`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #002115;
  margin-bottom: 4px;
`;

export const FormSubtitle = styled.p`
  font-size: 13px;
  color: #5d6d64;
`;

// 2-Method Segmented Switcher (Cards vs Mobile Banking)
export const SegmentedControl = styled.div`
  display: flex;
  background: #edf4f0;
  padding: 6px;
  border-radius: 18px;
  margin-bottom: 32px;
  gap: 6px;
`;

export const SegmentBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: none;

  background-color: ${props => props.$active ? "#006c4d" : "transparent"};
  color: ${props => props.$active ? "#ffffff" : "#3d4943"};
  box-shadow: ${props => props.$active ? "0 6px 18px rgba(0, 108, 77, 0.25)" : "none"};

  &:hover {
    color: ${props => props.$active ? "#ffffff" : "#006c4d"};
  }

  .material-symbols-outlined {
    font-size: 20px;
  }
`;

// Card Visual Container
export const VisualCardBox = styled.div`
  width: 100%;
  aspect-ratio: 1.6 / 1;
  max-width: 380px;
  margin: 0 auto 28px;
  background: linear-gradient(135deg, #0e1e19 0%, #00402d 60%, #006c4d 100%);
  border-radius: 22px;
  padding: 24px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 16px 36px rgba(0, 40, 29, 0.2);
  animation: ${floatGlow} 4s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const MetallicChip = styled.div`
  width: 44px;
  height: 32px;
  background: linear-gradient(135deg, #f0d068 0%, #c49a2a 100%);
  border-radius: 6px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
  }
`;

export const CardBrandLogo = styled.span<{ $color: string }>`
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.05em;
  color: ${props => props.$color};
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
`;

export const CardNumberText = styled.div`
  font-family: 'Courier Prime', 'Roboto Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const CardBottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 1;
`;

export const CardInputGrid = styled.div`
  display: grid;
  grid-template-cols: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 28px;
`;

export const InputGroup = styled.div<{ $span2?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${props => props.$span2 ? "span 2" : "span 1"};
`;

export const InputLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #171d1a;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1.5px solid #bccac1;
  background-color: #f6faf7;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #171d1a;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #006c4d;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(0, 108, 77, 0.12);
  }

  &::placeholder {
    color: #92a299;
  }
`;

export const MainPayButton = styled.button`
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #006c4d 0%, #004d37 100%);
  color: #ffffff;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 16px;
  font-weight: 800;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.25s ease;
  box-shadow: 0 10px 24px rgba(0, 108, 77, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00543c 0%, #003626 100%);
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 108, 77, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// MOBILE BANKING STYLES
export const MfsSelectorGrid = styled.div`
  display: grid;
  grid-template-cols: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (min-width: 480px) {
    grid-template-cols: repeat(4, 1fr);
  }
`;

export const MfsTile = styled.button<{ $selected: boolean; $brandColor: string; $bgColor: string }>`
  padding: 16px 12px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid ${props => props.$selected ? props.$brandColor : "rgba(0, 108, 77, 0.12)"};
  background-color: ${props => props.$selected ? props.$bgColor : "#ffffff"};
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 800;
    color: ${props => props.$selected ? props.$brandColor : "#3d4943"};
  }

  &:hover {
    border-color: ${props => props.$brandColor};
    transform: translateY(-2px);
  }
`;

export const MfsPortalCard = styled.div<{ $brandColor: string }>`
  border: 2px solid ${props => props.$brandColor};
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
`;

export const MfsPortalHeader = styled.div<{ $brandColor: string }>`
  background: ${props => props.$brandColor};
  color: #ffffff;
  padding: 14px 20px;
  text-align: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const MfsPortalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StepButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 14px 20px;
  border-radius: 12px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.$variant === "secondary" ? `
    background: #ffffff;
    color: #006c4d;
    border: 1px solid rgba(0, 108, 77, 0.25);
    &:hover { background: #edf4f0; }
  ` : `
    background: #006c4d;
    color: #ffffff;
    border: none;
    &:hover:not(:disabled) { background: #005139; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `}
`;

// PROCESSING OVERLAY & SPINNER
export const ProcessingOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 21, 14, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const LoaderCard = styled.div`
  background: #ffffff;
  border-radius: 28px;
  padding: 44px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
`;

export const Spinner = styled.div`
  width: 52px;
  height: 52px;
  border: 4px solid rgba(0, 108, 77, 0.15);
  border-top-color: #006c4d;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// E-TICKET SUCCESS VIEW
export const SuccessWrapper = styled.main`
  min-height: 100vh;
  background: radial-gradient(circle at 50% 20%, rgba(0, 108, 77, 0.08) 0%, transparent 50%), #f6faf7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
`;

export const TicketReceiptCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 28px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 24px 60px rgba(0, 40, 29, 0.12);
  border: 1px solid rgba(0, 108, 77, 0.15);
  overflow: hidden;
`;

export const TicketHeader = styled.div`
  background: linear-gradient(135deg, #006c4d 0%, #00402d 100%);
  color: #ffffff;
  padding: 36px 28px;
  text-align: center;
  position: relative;
`;

export const CheckIconCircle = styled.div`
  width: 64px;
  height: 64px;
  background: #ffffff;
  color: #006c4d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  .material-symbols-outlined {
    font-size: 36px;
    font-weight: 800;
  }
`;

export const TicketBody = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ReceiptLine = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

export const BarcodeBox = styled.div`
  margin-top: 16px;
  padding-top: 20px;
  border-top: 2px dashed rgba(0, 108, 77, 0.15);
  text-align: center;
  font-family: monospace;
  font-size: 22px;
  letter-spacing: 0.3em;
  color: #002115;
`;
