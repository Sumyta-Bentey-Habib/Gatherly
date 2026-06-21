"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

// ─── Design Tokens ────────────────────────────────────────────────────────────
// bg:       #080c14  (deep midnight)
// surface:  #0d1422  (dark navy)
// card:     #111927  (elevated card)
// border:   rgba(255,255,255,0.06)
// gold:     #e8b84b  (primary accent)
// gold2:    #c9952d  (secondary gold)
// text:     #f0f4ff  (primary text)
// muted:    #8899b0  (secondary text)
// danger:   #ff4d4f
// success:  #34d399
// purple:   #8b5cf6

export const DashPage = styled.div`
  min-height: 100vh;
  display: flex;
  background: #080c14;
  color: #f0f4ff;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

export const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 30;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const DashSidebar = styled.aside<{ $open: boolean }>`
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0d1422 0%, #0a111d 100%);
  border-right: 1px solid rgba(232, 184, 75, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 40;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${props => props.$open ? "translateX(0)" : "translateX(-100%)"};

  @media (min-width: 1024px) {
    position: relative;
    transform: none;
    margin: 16px 0 16px 16px;
    height: calc(100vh - 32px);
    border-radius: 20px;
    border: 1px solid rgba(232, 184, 75, 0.10);
    box-shadow: 0 0 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  }
`;

export const DashMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
`;

export const DashTopbar = styled.header`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: rgba(13, 20, 34, 0.85);
  border-bottom: 1px solid rgba(232, 184, 75, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (min-width: 1024px) {
    margin: 16px 16px 0 16px;
    border-radius: 16px;
    border: 1px solid rgba(232, 184, 75, 0.08);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  }
`;

export const MobileMenuBtn = styled.button`
  display: none;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: #8899b0;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.2s;

  &:hover {
    background: rgba(232, 184, 75, 0.12);
    color: #e8b84b;
    border-color: rgba(232, 184, 75, 0.25);
  }

  @media (max-width: 1023px) {
    display: block;
  }
`;

export const DashContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(232, 184, 75, 0.2);
    border-radius: 99px;
  }

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const SidebarBrandWrapper = styled.div`
  padding: 22px 20px;
  border-bottom: 1px solid rgba(232, 184, 75, 0.08);
`;

export const BrandIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #e8b84b 0%, #c9952d 100%);
  box-shadow: 0 4px 16px rgba(232, 184, 75, 0.35), inset 0 1px 0 rgba(255,255,255,0.2);
`;

export const SidebarUserCard = styled.div`
  margin: 14px;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(232, 184, 75, 0.08), rgba(201, 149, 45, 0.04));
  border: 1px solid rgba(232, 184, 75, 0.14);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    right: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(232, 184, 75, 0.06);
    pointer-events: none;
  }
`;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #080c14;
  background: linear-gradient(135deg, #e8b84b 0%, #c9952d 100%);
  flex-shrink: 0;
  border-radius: 9999px;
  width: 32px;
  height: 32px;
  font-size: 12px;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 12px rgba(232, 184, 75, 0.35);
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 0; }
`;

export const DashNavBtn = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  border: 1px solid ${props => props.$active ? "rgba(232, 184, 75, 0.25)" : "transparent"};
  color: ${props => props.$active ? "#e8b84b" : "#8899b0"};
  background: ${props => props.$active
    ? "linear-gradient(135deg, rgba(232, 184, 75, 0.12), rgba(201, 149, 45, 0.06))"
    : "transparent"};
  box-shadow: ${props => props.$active ? "0 2px 16px rgba(232, 184, 75, 0.08)" : "none"};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: ${props => props.$active ? "60%" : "0%"};
    background: linear-gradient(to bottom, #e8b84b, #c9952d);
    border-radius: 0 3px 3px 0;
    transition: height 0.2s ease;
  }

  &:hover {
    background: ${props => props.$active ? "" : "rgba(255,255,255,0.04)"};
    color: ${props => props.$active ? "#e8b84b" : "#c5d0e0"};
    border-color: ${props => props.$active ? "" : "rgba(255,255,255,0.06)"};
  }
`;

export const SidebarFooter = styled.div`
  padding: 14px;
  border-top: 1px solid rgba(232, 184, 75, 0.08);
`;

export const SignOutBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: rgba(255, 77, 79, 0.70);
  background: transparent;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 77, 79, 0.08);
    color: #ff4d4f;
    border-color: rgba(255, 77, 79, 0.20);
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`;

export const StatCardBlue = styled.div`
  background: linear-gradient(135deg, rgba(232, 184, 75, 0.10), rgba(201, 149, 45, 0.05));
  border: 1px solid rgba(232, 184, 75, 0.18);
  border-radius: 18px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(232, 184, 75, 0.06);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(232, 184, 75, 0.10);
  }
`;

export const StatCardGreen = styled.div`
  background: linear-gradient(135deg, rgba(52, 211, 153, 0.08), rgba(16, 185, 129, 0.04));
  border: 1px solid rgba(52, 211, 153, 0.15);
  border-radius: 18px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(52, 211, 153, 0.05);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(52, 211, 153, 0.08);
  }
`;

export const StatCardAmber = styled.div`
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(109, 40, 217, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 18px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(139, 92, 246, 0.05);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(139, 92, 246, 0.08);
  }
`;

export const DashCard = styled.div`
  background: #111927;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
`;

export const DashTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const BlueButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #e8b84b 0%, #c9952d 100%);
  color: #080c14;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(232, 184, 75, 0.25);
  letter-spacing: 0.01em;

  &:hover:not(:disabled) {
    box-shadow: 0 8px 28px rgba(232, 184, 75, 0.40);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: rgba(255,255,255,0.06);
    color: #8899b0;
    border: 1px solid rgba(255,255,255,0.06);
    cursor: wait;
    box-shadow: none;
  }
`;

export const GhostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.04);
  color: #c5d0e0;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  letter-spacing: 0.01em;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.18);
    color: #f0f4ff;
  }
`;

export const Select = styled.select`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(232, 184, 75, 0.15);
  border-radius: 8px;
  padding: 8px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #f0f4ff;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    border-color: rgba(232, 184, 75, 0.40);
    box-shadow: 0 0 0 3px rgba(232, 184, 75, 0.08);
  }

  option {
    background: #0d1422;
    color: #f0f4ff;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #8899b0;
  text-transform: uppercase;
  letter-spacing: 0.10em;
  user-select: none;
`;

export const FieldInput = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  color: #f0f4ff;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #8899b0;
  }

  &:focus {
    border-color: rgba(232, 184, 75, 0.50);
    box-shadow: 0 0 0 3px rgba(232, 184, 75, 0.10);
    background: rgba(232, 184, 75, 0.03);
  }
`;

export const ChartContainer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  padding-top: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  user-select: none;
`;

export const ChartBarColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const ChartBar = styled.div<{ $percent: number }>`
  width: 100%;
  background: linear-gradient(to top, #e8b84b, rgba(232, 184, 75, 0.4));
  border: 1px solid rgba(232, 184, 75, 0.20);
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
  height: ${props => props.$percent}px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px 6px 0 0;
    background: linear-gradient(to top, transparent, rgba(255,255,255,0.06));
  }

  &:hover {
    background: linear-gradient(to top, #f0c96a, rgba(240, 201, 106, 0.5));
    box-shadow: 0 0 16px rgba(232, 184, 75, 0.25);
  }
`;

export const ChartBarLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  color: #8899b0;
  margin-top: 4px;
`;

export const SidebarBrandLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

export const BrandName = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #f0f4ff;
  text-transform: uppercase;
`;

export const UserCardInner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

export const UserAvatarLg = styled(UserAvatar)`
  width: 42px;
  height: 42px;
  font-size: 15px;
`;

export const UserInfo = styled.div`
  min-width: 0;
`;

export const UserName = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #f0f4ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
`;

export const StatusDot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: ${props => props.$color || "#e8b84b"};
  display: inline-block;
  box-shadow: 0 0 6px ${props => props.$color || "#e8b84b"};
`;

export const UserRole = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #8899b0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

export const NavActiveDot = styled.span`
  margin-left: auto;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #e8b84b;
  display: inline-block;
  box-shadow: 0 0 8px rgba(232, 184, 75, 0.6);
`;

export const TopbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TopbarTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: 0.01em;
`;

export const TopbarSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #8899b0;
  letter-spacing: 0.06em;
  margin-top: 2px;
`;

export const HomeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(232, 184, 75, 0.18);
  background: rgba(232, 184, 75, 0.06);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #e8b84b;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  letter-spacing: 0.02em;

  &:hover {
    background: rgba(232, 184, 75, 0.12);
    border-color: rgba(232, 184, 75, 0.35);
    box-shadow: 0 4px 16px rgba(232, 184, 75, 0.12);
  }
`;

export const UserAvatarSm = styled(UserAvatar)`
  width: 34px;
  height: 34px;
  font-size: 12px;
`;

export const TabPane = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TabPaneGap20 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StatLabel = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #8899b0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
`;

export const StatValue = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 38px;
  font-weight: 800;
  color: #f0f4ff;
  margin-top: 10px;
  letter-spacing: -0.02em;
`;

export const ChartHeaderRow = styled.div`
  margin-bottom: 20px;
`;

export const ChartTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #f0f4ff;
  letter-spacing: 0.01em;
`;

export const ChartDesc = styled.p`
  color: #8899b0;
  font-size: 12px;
  margin-top: 4px;
`;

export const SectionTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: -0.01em;
`;

export const SectionCount = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #8899b0;
  font-weight: 500;
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
`;

export const TableTh = styled.th`
  padding: 14px 20px;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: #8899b0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
`;

export const TableTr = styled.tr`
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.15s;

  &:hover {
    background: rgba(232, 184, 75, 0.03);
  }
`;

export const TableTdMono = styled.td`
  padding: 16px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #8899b0;
  font-variant-numeric: tabular-nums;
`;

export const TableTdTitle = styled.td`
  padding: 16px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #f0f4ff;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableTdBold = styled.td`
  padding: 16px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #e8b84b;
`;

export const TableTdPad = styled.td`
  padding: 14px 20px;
`;

export const DeleteBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 77, 79, 0.75);
  border: 1px solid rgba(255, 77, 79, 0.20);
  padding: 7px 14px;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 77, 79, 0.10);
    color: #ff4d4f;
    border-color: rgba(255, 77, 79, 0.35);
  }
`;

export const EditBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #e8b84b;
  border: 1px solid rgba(232, 184, 75, 0.20);
  padding: 7px 14px;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    background: rgba(232, 184, 75, 0.10);
    border-color: rgba(232, 184, 75, 0.40);
  }
`;

export const TableImgTd = styled.td`
  padding: 14px 20px;
`;

export const TableImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(232, 184, 75, 0.15);
`;

export const EventFormTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
`;

export const EventFormBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EventFormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
`;

export const EventFormGridCenter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: center;
`;

export const EventFormActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0;
`;

export const CheckboxInput = styled.input`
  width: 17px;
  height: 17px;
  cursor: pointer;
  accent-color: #e8b84b;
`;

export const CheckboxLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #c5d0e0;
  cursor: pointer;
`;

export const TextareaField = styled.input`
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 14px;
  color: #f0f4ff;
  font-family: 'Inter', sans-serif;
  outline: none;
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: #8899b0;
  }

  &:focus {
    border-color: rgba(232, 184, 75, 0.50);
    box-shadow: 0 0 0 3px rgba(232, 184, 75, 0.10);
  }
`;

export const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.70);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const ModalCard = styled(motion.div)`
  background: linear-gradient(145deg, #111927, #0d1422);
  border-radius: 24px;
  border: 1px solid rgba(232, 184, 75, 0.15);
  box-shadow: 0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05);
  width: 100%;
  max-width: 480px;
  padding: 32px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -60px;
    width: 200px;
    height: 200px;
    background: radial-gradient(ellipse, rgba(232, 184, 75, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const FormModalCard = styled(ModalCard)`
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(232, 184, 75, 0.20);
    border-radius: 99px;
  }
`;

export const ModalIconBox = styled.div<{ $color?: string }>`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: ${props => props.$color || "rgba(255, 77, 79, 0.10)"};
  border: 1px solid ${props => props.$color ? "rgba(232, 184, 75, 0.25)" : "rgba(255, 77, 79, 0.20)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${props => props.$color ? "#e8b84b" : "#ff4d4f"};
`;

export const ModalTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: -0.01em;
  margin-bottom: 12px;
`;

export const ModalDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #8899b0;
  line-height: 1.65;
  margin-bottom: 24px;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
