"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { createRoot } from "react-dom/client";
import ToastMessage, { ToastType } from "./ToastMessage";

interface ToastItem {
  id: number;
  type: ToastType;
  title: string;
  content: string;
}

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    window.showToast = (type: ToastType, title: string, content: string) => {
      const newToast = {
        id: Date.now() - Math.random(),
        type,
        title,
        content,
      };

      setToasts((prev) => {
        if (prev.length >= 5) {
          const excessCount = prev.length - 4;
          prev.slice(-excessCount).forEach((toast, index) => {
            setTimeout(() => {
              setToasts((current) => current.filter((t) => t.id !== toast.id));
            }, 100 * index);
          });
        }
        return [newToast, ...prev];
      });

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 3000);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[200]">
      {/* <AnimatePresence> */}
      {toasts.map((toast) => (
        <ToastMessage
          type={toast.type}
          title={toast.title}
          content={toast.content}
          key={toast.id}
        />
      ))}
      {/* </AnimatePresence> */}
    </div>,
    document.body
  );
};

declare global {
  interface Window {
    showToast: (type: ToastType, title: string, content: string) => void;
  }
}

if (typeof window !== "undefined") {
  const toastRoot = document.createElement("div");
  toastRoot.id = "toast-root";
  document.body.appendChild(toastRoot);

  const root = document.createElement("div");
  root.id = "toast-container";
  toastRoot.appendChild(root);

  createRoot(root).render(<ToastContainer />);
}

export const showToast = (type: ToastType, title: string, content: string) => {
  if (typeof window !== "undefined") {
    window.showToast(type, title, content);
  }
};
