import LoginForm from "@/components/login/LoginForm";
import CustomIcon, { IconList } from "@/Icons";
import Link from "next/link";
import React from "react";

const NAV_LINKS = [
  { href: "/find/email", text: "이메일 찾기" },
  { href: "/find/password", text: "비밀번호 찾기" },
  { href: "/signup", text: "회원가입" },
];

const SOCIAL_LINKS = [
  { href: "/kakao", link: "KAKAO" },
  {
    href: "http://ec2-43-200-179-173.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver",
    link: "NAVER",
  },
  {
    href: "http://ec2-43-200-179-173.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google",
    link: "GOOGLE",
  },
];

const Page = () => {
  return (
    <div className="w-full h-[calc(100vh-82px)] flex-center flex-col">
      <div className="min-w-[400px] flex flex-col gap-5">
        <div className="flex items-center gap-[10px]">
          <CustomIcon icon="LOGO_SVG" className="w-[24px] h-[23px]" />
          <h1 className="text-2xl font-semibold">GAME BID</h1>
        </div>

        <LoginForm />

        <div className="w-full flex-center gap-5 text-[16px] font-normal leading-[1.4em] tracking-[-0.02em] text-fgGrayDefault">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="px-3">
              <p>{link.text}</p>
            </Link>
          ))}
        </div>

        <hr className="border-fillGrayDefault" />

        <div className="flex-center gap-5">
          {SOCIAL_LINKS.map((social) => (
            <Link key={social.href} href={social.href}>
              <div className="w-[48px] h-[48px] flex-center rounded-full bg-fillGrayDefault">
                <CustomIcon
                  icon={social.link as IconList}
                  className="w-[24px] h-[24px]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
