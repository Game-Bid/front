"use client";

import React from "react";
import ChatModal from "./ChatModal";
import { useChatModalStore } from "@/stores/chatModalStore";

const ChatModalWrapper = () => {
  const { isOpen } = useChatModalStore();

  if (!isOpen) return null;

  return <ChatModal />;
};

export default ChatModalWrapper;
