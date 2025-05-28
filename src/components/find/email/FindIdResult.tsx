import Button from "@/components/common/Button";
import Link from "next/link";
import React from "react";

interface FindIdResultProps {
  userInfo: {
    email: string;
  };
}

const FindIdResult = ({ userInfo }: FindIdResultProps) => {
  const resultInfo = [{ label: "이메일", value: userInfo?.email }];

  return (
    <div className="flex flex-col gap-[20px]">
      {resultInfo.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-[4px]">
          <h1 className="text-1 leading-[1.4] tracking-[-0.32px] text-fgGrayDefault">
            {item.label}
          </h1>
          <p className="text-1 leading-[1.4] tracking-[-0.36px] text-fgPrimaryAccent">
            {item.value}
          </p>
        </div>
      ))}
      <Link href="/login" className="w-full">
        <Button title="로그인하기" className="w-full" />
      </Link>
    </div>
  );
};

export default FindIdResult;
