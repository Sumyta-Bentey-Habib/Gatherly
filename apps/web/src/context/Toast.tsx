"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastContextType {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{
      success: (msg) => showToast(msg, "success"),
      error: (msg) => showToast(msg, "error"),
      info: (msg) => showToast(msg, "info"),
    }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 9999,
              padding: "16px 24px",
              borderRadius: "12px",
              backgroundColor: toast.type === "error" ? "#ff4d4f" : toast.type === "success" ? "#34d399" : "#111927",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    return {
      success: console.log,
      error: console.error,
      info: console.info,
    };
  }
  return context;
}
