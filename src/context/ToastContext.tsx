"use client";

import React, { createContext, useCallback, useState } from "react";
import ToastMessage from "@/components/common/ToastMessage";
import { createPortal } from "react-dom";
import { ToastMessageProps } from "@/components/common/ToastMessage";

interface ToastContextType {
  addToast: (toast: Omit<ToastMessageProps, "id" | "createdAt">) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessageProps[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastMessageProps, "id" | "createdAt">) => {
      setToasts((prev) => {
        const newToasts = [...prev];
        if (newToasts.length >= 5) {
          newToasts.shift();
        }

        return [
          ...newToasts,
          {
            ...toast,
            id: Math.random().toString(36).substring(2),
            createdAt: Date.now(),
          },
        ];
      });
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 pointer-events-none w-full max-w-[25rem]">
          {toasts.map((toast, index) => (
            <div
              key={toast.id}
              style={{
                transform: `translateY(${index * 84}px)`, // ToastMessage 높이 + gap
                transition: "transform 0.3s ease-out",
              }}
              className="opacity-0 animate-toastSlide"
            >
              <ToastMessage
                type={toast.type}
                title={toast.title}
                content={toast.content}
              />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
