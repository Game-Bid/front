import Link from "next/link";
import React from "react";

interface FindIdResultProps {
  userInfo: {
    email: string;
    joined: string;
  };
}

const FindIdResult = ({ userInfo }: FindIdResultProps) => {
  const resultInfo = [
    { label: "이메일", value: userInfo?.email },
    { label: "계정정보", value: userInfo?.joined },
  ];

  return (
    <div className="flex flex-col gap-5">
      {resultInfo.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <h1 className="text-[16px] leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault">
            {item.label}
          </h1>
          <p className="text-[18px] leading-[1.4em] tracking-[-0.02em] text-fgPrimaryAccent">
            {item.value}
          </p>
        </div>
      ))}
      <Link href="/login">
        <button className="w-full min-h-[3rem] px-3 rounded-[10px] bg-fillPrimaryDefault">
          로그인하기
        </button>
      </Link>
    </div>
  );
};

export default FindIdResult;
