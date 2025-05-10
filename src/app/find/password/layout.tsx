import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[calc(100vh-82px)] flex-center flex-col">
      <div className="w-[400px] flex flex-col gap-[20px]">
        <h1 className="text-1.5 font-semibold leading-[1.4] tracking-[-0.48%] text-fgGrayDefault">
          비밀번호 찾기
        </h1>
        {children}
      </div>
    </div>
  );
};

export default layout;
