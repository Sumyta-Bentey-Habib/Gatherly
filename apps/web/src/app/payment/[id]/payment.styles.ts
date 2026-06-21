"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

export const PaymentContainer = styled.main`
  min-height: 100vh;
  background-color: #f8f9fa;
  color: #191c1d;
  padding-top: 100px;
  padding-bottom: 96px;
`;

export const GridWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const BreadcrumbButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(25, 28, 29, 0.7);
  background: none;
  border: none;
  font-family: monospace;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: #000000;
  }

  .material-symbols-outlined {
    font-size: 12px;
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #000000;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

export const PageSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(25, 28, 29, 0.6);
  margin-top: 4px;
`;

export const ContentLayout = styled.div`
  display: grid;
  grid-template-cols: 1fr;
  gap: 48px;
  margin-top: 32px;
  align-items: start;

  @media (min-width: 1024px) {
    grid-template-cols: repeat(12, 1fr);
  }
`;

export const PaymentFormPanel = styled.div`
  background-color: #ffffff;
  border: 1px solid rgba(196, 199, 199, 0.3);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    padding: 32px;
  }

  @media (min-width: 1024px) {
    grid-column: span 8;
  }
`;

export const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(196, 199, 199, 0.2);
  padding-bottom: 16px;
  margin-bottom: 32px;
  overflow-x: auto;
  gap: 8px;
  user-select: none;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: ${props => props.$active ? "#000000" : "transparent"};
  color: ${props => props.$active ? "#ffffff" : "rgba(25, 28, 29, 0.8)"};
  border: 1px solid ${props => props.$active ? "#000000" : "transparent"};

  &:hover {
    background-color: ${props => props.$active ? "#000000" : "#f1f3f4"};
  }

  .material-symbols-outlined {
    font-size: 16px;
  }
`;

export const TabTitle = styled.h3`
  font-family: monospace;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(25, 28, 29, 0.6);
  margin-bottom: 16px;
  user-select: none;
`;

// Mock Card Styles
export const CardPreview = styled.div`
  width: 100%;
  max-width: 384px;
  height: 192px;
  background: linear-gradient(135deg, #1c1d1f 0%, #0d0e10 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: border-between;
  justify-content: space-between;
  align-items: center;
`;

export const CardSystemLabel = styled.span`
  font-family: monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.6;
`;

export const CardBrand = styled.span<{ $brandColor: string }>`
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  font-style: italic;
  color: ${props => props.$brandColor};
`;

export const CardNumberDisplay = styled.div`
  font-family: monospace;
  font-size: 18px;
  letter-spacing: 0.15em;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.8;
`;

export const CardHolderBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardDetailLabel = styled.div`
  opacity: 0.5;
  font-size: 8px;
  margin-bottom: 2px;
`;

export const CardDetailValue = styled.div`
  font-weight: bold;
`;

// Card fields layout
export const CardFieldsGrid = styled.div`
  display: grid;
  grid-template-cols: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-cols: repeat(2, 1fr);
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #191c1d;
  user-select: none;
`;

export const FieldInput = styled.input`
  width: 100%;
  border: 1px solid rgba(196, 199, 199, 1);
  border-radius: 12px;
  padding: 14px;
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #000000;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #000000;
  }

  &::placeholder {
    color: rgba(25, 28, 29, 0.3);
  }
`;

export const PayButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  border-radius: 9999px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 32px;

  &:hover:not(:disabled) {
    background-color: #526069;
    border-color: #526069;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// Summary Card Styles
export const SummaryCard = styled.div`
  background-color: #ffffff;
  border: 1px solid rgba(196, 199, 199, 0.3);
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    padding: 32px;
  }

  @media (min-width: 1024px) {
    grid-column: span 4;
    position: sticky;
    top: 112px;
  }
`;

export const SummaryHeader = styled.h3`
  font-family: monospace;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(25, 28, 29, 0.6);
  border-bottom: 1px solid rgba(196, 199, 199, 0.2);
  padding-bottom: 16px;
  user-select: none;
`;

export const SummaryTourTitle = styled.h4`
  font-family: monospace;
  font-size: 14px;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  line-height: 1.4;
`;

export const DetailRow = styled.div`
  display: grid;
  grid-template-cols: repeat(2, 1fr);
  gap: 16px;
  border-top: 1px solid rgba(196, 199, 199, 0.2);
  border-bottom: 1px solid rgba(196, 199, 199, 0.2);
  padding: 16px 0;
  font-family: monospace;
  font-size: 12px;
`;

export const DetailCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 9px;
  user-select: none;
`;

export const DetailVal = styled.span`
  font-weight: bold;
  color: #000000;
`;

export const CostBox = styled.div`
  background-color: #f1f3f4;
  border: 1px solid rgba(196, 199, 199, 0.2);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: monospace;
  font-size: 12px;
  color: #444748;
`;

export const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CostTotalRow = styled.div`
  border-top: 1px solid rgba(196, 199, 199, 0.2);
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  text-transform: uppercase;
`;

// Provider Grid
export const ProviderGrid = styled.div`
  display: grid;
  grid-template-cols: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-cols: repeat(4, 1fr);
  }
`;

export const ProviderBtn = styled.button<{ $selected: boolean; $brandColor: string; $bgColor: string }>`
  border: 1px solid ${props => props.$selected ? props.$brandColor : "rgba(196, 199, 199, 0.3)"};
  background-color: ${props => props.$selected ? props.$bgColor : "transparent"};
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$selected ? props.$bgColor : "#f1f3f4"};
  }

  span {
    font-family: monospace;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: ${props => props.$brandColor};
  }
`;

// Mobile Form Sub-wrapper
export const MobileFormWrapper = styled.div`
  background-color: #f8f9fa;
  border: 1px solid rgba(196, 199, 199, 0.2);
  border-radius: 16px;
  padding: 24px;
  max-width: 448px;
  margin: 32px auto 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProviderBadgeWrapper = styled.div`
  text-align: center;
`;

export const ProviderBadge = styled.span`
  font-family: monospace;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 4px 12px;
  background-color: #ffffff;
  border: 1px solid rgba(196, 199, 199, 0.2);
  border-radius: 9999px;
  color: rgba(25, 28, 29, 0.8);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

export const SecondaryBtn = styled.button`
  flex: 1;
  padding: 12px;
  background-color: transparent;
  border: 1px solid rgba(196, 199, 199, 1);
  color: #191c1d;
  border-radius: 9999px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
  }
`;

export const PrimaryBtn = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  border-radius: 9999px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #526069;
    border-color: #526069;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// Processing Loader Overlay
export const ProcessingOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 384px;
`;

export const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ProcessingMsg = styled.p`
  color: #ffffff;
  font-family: monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

// Success View Styles
export const SuccessContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  color: #191c1d;
  padding-top: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
`;

export const SuccessCard = styled(motion.div)`
  background-color: #ffffff;
  border: 1px solid rgba(196, 199, 199, 0.3);
  border-radius: 24px;
  padding: 32px;
  max-width: 512px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

export const CheckCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #e8f5e9;
  border: 1px solid #c8e6c9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2e7d32;
  margin: 0 auto 24px;

  .material-symbols-outlined {
    font-size: 40px;
    font-weight: bold;
  }
`;

export const SuccessReceipt = styled.div`
  background-color: #f8f9fa;
  border: 1px solid rgba(196, 199, 199, 0.2);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 32px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: monospace;
  font-size: 12px;
  color: #444748;
`;

export const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ReceiptLabel = styled.span`
  opacity: 0.6;
`;

export const ReceiptVal = styled.span`
  font-weight: bold;
  color: #191c1d;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;
