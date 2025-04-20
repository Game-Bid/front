import Link from "next/link";
import React from "react";

const buttonStyle =
  "w-full min-h-[48px] px-3 rounded-[10px] bg-fillPrimaryDefault text-[16px] font-semibold leading-[1.4em] tracking-[-0.02em] text-fgPrimaryDefault";

const FindPwdResult = () => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[18px] leading-[25.2px] tracking-[-0.02em] text-fgPrimaryAccent">
        임시 비밀번호가 이메일로 발송되었습니다.
      </p>
      <Link href="/login">
        <button className={buttonStyle}>로그인 하기</button>
      </Link>
    </div>
  );
};

export default FindPwdResult;
