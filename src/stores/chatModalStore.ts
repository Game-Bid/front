import { create } from "zustand";

type ChatModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useChatModalStore = create<ChatModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
