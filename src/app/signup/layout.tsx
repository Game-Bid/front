import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-[calc(100vh-82px)] flex-center flex-col">
      <div className="w-[400px] flex flex-col gap-5 my-24">
        <h1 className="text-[24px] font-semibold leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault">
          회원가입
        </h1>
        {children}
      </div>
    </div>
  );
};

export default layout;
