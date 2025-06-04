"use client";

import { useState } from "react";
import Button from "../common/Button";

interface Message {
  type: "sent" | "received";
  text: string;
  time: string;
}

interface ChatInfo {
  title: string;
  subtitle: string;
  category: "ITEM" | "ACCOUNT";
  unreadCount: number | string | null;
  messages: Message[];
}

interface ChatData {
  tabs: string[];
  messages: {
    구매: Record<number, ChatInfo>;
    판매: Record<number, ChatInfo>;
  };
}

const ChatModal = () => {
  const chatData: ChatData = {
    tabs: ["구매", "판매"],
    messages: {
      구매: {
        0: {
          title: "메이플스토리 뇌전수리검 팔아요",
          subtitle: "아이템 판매",
          category: "ITEM",
          unreadCount: null,
          messages: [
            {
              type: "sent",
              text: "안녕하세요! 방금 뇌전 수리검 다량발주 구매자입니다 :) 아이템 전달 가능하신 시간 여쭤보고자 연락드렸어요.",
              time: "2025.05.25 16:32",
            },
            {
              type: "received",
              text: "안녕하세요~ 네, 지금 바로 전달 가능하고 게임 접속도 준비해 있어요. 캐릭터 알려주시면 이동할게요!",
              time: "2025.05.25 16:35",
            },
          ],
        },
        1: {
          title: "리니지 데포로우 계정 구매",
          subtitle: "계정 판매",
          category: "ACCOUNT",
          unreadCount: 4,
          messages: [
            {
              type: "received",
              text: "안녕하세요! 리니지 데포로우 계정 판매합니다. 레벨 85, 풀템 계정이에요.",
              time: "2025.05.25 14:20",
            },
            {
              type: "sent",
              text: "가격이 어떻게 되나요? 그리고 계정 이전은 어떻게 진행되나요?",
              time: "2025.05.25 14:25",
            },
            {
              type: "received",
              text: "가격은 50만원이고, 계정 이전은 이메일과 비밀번호 변경으로 진행됩니다.",
              time: "2025.05.25 14:30",
            },
          ],
        },
        2: {
          title: "세븐나이츠 리버스 아이템 구매",
          subtitle: "아이템 판매",
          category: "ITEM",
          unreadCount: 3,
          messages: [
            {
              type: "sent",
              text: "세븐나이츠 리버스 아이템 구매하고 싶습니다. 어떤 아이템들 있나요?",
              time: "2025.05.25 13:45",
            },
            {
              type: "received",
              text: "현재 전설급 무기와 방어구 세트 판매중입니다. 스크린샷 보내드릴게요!",
              time: "2025.05.25 13:50",
            },
          ],
        },
        3: {
          title: "로드나인 이그니션 아이템",
          subtitle: "아이템 판매",
          category: "ITEM",
          unreadCount: null,
          messages: [
            {
              type: "received",
              text: "로드나인 레어 아이템 판매합니다. 관심 있으시면 연락주세요.",
              time: "2025.05.25 12:15",
            },
            {
              type: "sent",
              text: "어떤 아이템인지 자세히 알 수 있을까요?",
              time: "2025.05.25 12:20",
            },
          ],
        },
        4: {
          title: "리니지 켄라우엘 무기 구매",
          subtitle: "아이템 판매",
          category: "ITEM",
          unreadCount: 1,
          messages: [
            {
              type: "sent",
              text: "켄라우엘 무기 구매 문의드립니다. 아직 판매 가능한가요?",
              time: "2025.05.25 11:30",
            },
            {
              type: "received",
              text: "네, 아직 판매 가능합니다. 가격은 30만원입니다.",
              time: "2025.05.25 11:35",
            },
          ],
        },
      },
      판매: {
        0: {
          title: "던전앤파이터 무기 판매",
          subtitle: "아이템 판매",
          category: "ITEM",
          unreadCount: 2,
          messages: [
            {
              type: "received",
              text: "던파 무기 구매하고 싶습니다. 아직 판매 가능한가요?",
              time: "2025.05.25 13:15",
            },
            {
              type: "sent",
              text: "네 아직 판매 가능합니다! 어떤 무기를 찾고 계신가요?",
              time: "2025.05.25 13:18",
            },
          ],
        },
        1: {
          title: "피파온라인4 선수카드 판매",
          subtitle: "아이템 판매",
          category: "ACCOUNT",
          unreadCount: null,
          messages: [
            {
              type: "sent",
              text: "피파 선수카드 판매합니다. 메시, 호날두 등 레어카드 보유중이에요.",
              time: "2025.05.25 12:30",
            },
            {
              type: "received",
              text: "메시 카드 가격이 어떻게 되나요?",
              time: "2025.05.25 12:35",
            },
          ],
        },
        2: {
          title: "배틀그라운드 스킨 판매",
          subtitle: "아이템 판매",
          category: "ITEM",
          unreadCount: 7,
          messages: [
            {
              type: "sent",
              text: "배그 레어 스킨 여러개 판매합니다. 관심있으시면 연락주세요!",
              time: "2025.05.25 11:45",
            },
            {
              type: "received",
              text: "어떤 스킨들이 있는지 리스트 좀 보여주실 수 있나요?",
              time: "2025.05.25 11:50",
            },
            {
              type: "sent",
              text: "네, 잠시만요. 스크린샷 찍어서 보내드릴게요.",
              time: "2025.05.25 11:52",
            },
          ],
        },
        3: {
          title: "오버워치2 계정 판매",
          subtitle: "계정 판매",
          category: "ACCOUNT",
          unreadCount: 1,
          messages: [
            {
              type: "sent",
              text: "오버워치2 다이아 계정 판매합니다. 모든 영웅 보유중입니다.",
              time: "2025.05.25 10:20",
            },
            {
              type: "received",
              text: "계정 이전은 어떻게 진행되나요? 안전한가요?",
              time: "2025.05.25 10:25",
            },
          ],
        },
        4: {
          title: "롤 다이아 계정 판매",
          subtitle: "계정 판매",
          category: "ACCOUNT",
          unreadCount: "99+",
          messages: [
            {
              type: "sent",
              text: "롤 다이아 계정 판매합니다. 모든 챔피언과 스킨 다수 보유!",
              time: "2025.05.25 09:15",
            },
            {
              type: "received",
              text: "가격이 어떻게 되나요? 그리고 계정 상태는 어떤가요?",
              time: "2025.05.25 09:20",
            },
            {
              type: "sent",
              text: "가격은 80만원이고, 계정 상태 매우 깨끗합니다. 제재 이력 전혀 없어요.",
              time: "2025.05.25 09:25",
            },
          ],
        },
      },
    },
  };

  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState(chatData.tabs[0]);
  const [activeChat, setActiveChat] = useState(0);

  const currentChatList = Object.entries(
    chatData.messages[activeTab as keyof typeof chatData.messages] || {}
  ).map(([id, chat]) => ({
    id: parseInt(id),
    name: chat.title,
    category: chat.category,
    count: chat.unreadCount,
  }));

  const currentMessages = chatData.messages[
    activeTab as keyof typeof chatData.messages
  ]?.[activeChat] || {
    title: "채팅을 선택해주세요",
    subtitle: "",
    category: "아이템" as const,
    unreadCount: null,
    messages: [],
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveChat(0); // 탭 변경시 첫 번째 채팅으로 리셋
  };

  return (
    <div className="w-screen h-screen bg-[rgba(8,8,8,0.8)] flex items-center justify-center fixed inset-0 z-[100]">
      <div className="w-[80vw] h-[80vh] bg-bgGrayDepth3 flex rounded-md overflow-hidden shadow-[inset_0px_4px_60px_rgba(148,156,247,0.25)]l">
        {/* Left Sidebar - Chat List */}
        <div className="w-[260px] bg-bgGrayDepth2 flex flex-col gap-[24px]">
          {/* Sidebar Header */}
          <div className="pt-1.5 px-1 ">
            <div className="flex items-center justify-between">
              <span className="text-fgGrayDefault font-semibold leading-[1.4] tracking-[-0.36px] text-1.125">
                채팅 목록
              </span>
              <div className="relative flex bg-fillGrayDefault rounded-max ">
                {/* Sliding Background */}
                <div
                  className={`absolute top-0 bottom-1 w-[72px] h-[38px] bg-[#5865f2] rounded-full transition-transform duration-300 ease-in-out ${
                    activeTab === "구매" ? "translate-x-0" : "translate-x-14"
                  }`}
                />

                {/* Buttons */}
                <button
                  onClick={() => handleTabChange("구매")}
                  className={`relative z-10 px-[24px] py-[10px] text-0.875 rounded-full transition-colors duration-300 ${
                    activeTab === "구매"
                      ? "text-white"
                      : "text-fgGrayDisabled hover:text-white"
                  }`}
                >
                  구매
                </button>
                <button
                  onClick={() => handleTabChange("판매")}
                  className={`relative z-10 px-[24px] py-[10px] text-0.875 rounded-full transition-colors duration-300 ${
                    activeTab === "판매"
                      ? "text-white"
                      : "text-fgGrayDisabled hover:text-white"
                  }`}
                >
                  판매
                </button>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <div className="overflow-y-auto h-full scrollbar-dropdown">
            {currentChatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`flex items-center gap-[8px] p-[12px] cursor-pointer hover:bg-[#2e3035] border-b border-[#2e3035] transition-colors ${
                  activeChat === chat.id ? "bg-[#2e3035]" : ""
                }`}
              >
                <div className="w-10 h-10 bg-[#393c43] rounded-full flex items-center justify-center text-white text-sm">
                  t
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{chat.name}</div>
                  <div
                    className={`text-0.75 font-medium ${
                      chat.category === "ACCOUNT"
                        ? "text-colorTypeAccount"
                        : "text-colorTypeItem"
                    }`}
                  >
                    {chat.category}
                  </div>
                </div>
                {chat.count && (
                  <span className="bg-fillPrimaryDefault text-fgPrimaryDefault text-0.75 py-[2px] px-[8px] rounded-[12px] flex-center h-fit font-medium leading-[1.4] tracking-[-0.24px]">
                    {chat.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Interface */}
        <div className="flex-1 flex flex-col px-[16px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between py-[24px] border-b border-borderDivider">
            <div className="flex items-center gap-[12px]">
              <div className="w-10 h-10 bg-[#393c43] rounded-full flex items-center justify-center text-white text-sm">
                t
              </div>
              <div>
                <h2 className="text-fgGrayDefault text-1.5 font-semibold leading-[1.4] tracking-[-0.48px]">
                  {currentMessages.title}
                </h2>
                {currentMessages.subtitle && (
                  <p
                    className={`text-1.124 leading-[1.4] tracking-[-0.36px ] ${
                      currentMessages.category === "ACCOUNT"
                        ? "text-colorTypeAccount"
                        : "text-colorTypeItem"
                    }`}
                  >
                    {currentMessages.subtitle}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-[12px]">
              <Button title="경매글 확인하기" variant="secondary" />
              <Button title="닫기" variant="secondary" />
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="h-full flex flex-col justify-end space-y-3">
              {currentMessages.messages.map((msg: Message, index: number) => (
                <div
                  key={index}
                  className={`w-full flex ${
                    msg.type === "sent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-end gap-[10px]  ${
                      msg.type === "sent"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div className="w-7 h-7 bg-[#393c43] rounded-full flex items-center justify-center text-white text-xs">
                      t
                    </div>
                    <div
                      className={`p-[16px] rounded-lg text-[14px] font-semibold leading-[1.3] tracking-[-0.28px] max-w-[360px] ${
                        msg.type === "sent"
                          ? "bg-fillPrimaryFocused text-white"
                          : "bg-fillGrayFocused text-white"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                    <div
                      className={`text-xs opacity-70 text-nowrap ${
                        msg.type === "sent" ? "text-right" : ""
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input Area */}
          <div className="p-3 bg-[#28282d] border-t border-[#2e3035]">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-[#393c43] border border-[#393c43] text-white placeholder-[#7c7c84] text-sm h-9 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
              />
              <button className="flex items-center px-3 py-2 text-xs text-[#cdcdcd] border border-[#393c43] bg-[#393c43] rounded-md hover:bg-[#2e3035] transition-colors">
                {/* <Archive className="w-3 h-3 mr-1" /> */}
                결제하기
              </button>
              <button className="flex items-center px-3 py-2 text-xs text-white bg-[#5865f2] rounded-md hover:bg-[#3f4999] transition-colors">
                {/* <Send className="w-3 h-3 mr-1" /> */}
                전송하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
