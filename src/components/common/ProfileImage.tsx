import CustomIcon from "@/Icons/Icon";
import Image from "next/image";
import React from "react";

interface ProfileImageProps {
  nickname: string;
  src?: string;
  size?: "lg" | "sm";
  hover?: boolean;
  setFile?: () => void;
}

const ProfileImage = ({
  nickname,
  src,
  size = "lg",
  hover = true,
  setFile,
}: ProfileImageProps) => {
  const sizeStyle = size === "lg" ? "w-[80px] h-[80px]" : "w-[40px] h-[40px]";
  const fontStyle =
    size === "lg"
      ? "text-1.75 tracking-[-0.56px]"
      : "text-[14px] tracking-[-0.28px]";
  return (
    <div
      className={`${sizeStyle} flex-center rounded-max bg-[rgba(0,0,0,0.1)] relative group overflow-hidden`}
    >
      {hover && size === "lg" && (
        <>
          <label htmlFor="profileImage">
            <div className="absolute-center p-[6px] bg-fillGrayHovered shadow-sm rounded-[6px] z-10 hidden group-hover:block">
              <CustomIcon icon="ARROW-REFRESH" className="w-[24px] h-[24px]" />
            </div>
          </label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            className="hidden"
            onClick={setFile}
          />
        </>
      )}
      {src ? (
        <Image
          src={src}
          fill
          alt={nickname}
          className={`${
            hover && "group-hover:opacity-90 group-hover:blur-[2px]"
          }`}
        />
      ) : (
        <p
          className={`${fontStyle} text-fgGrayDefault font-semibold uppercase leading-[1.3] w-full h-full flex-center ${
            hover && "group-hover:opacity-90 group-hover:blur-[2px]"
          }`}
        >
          {nickname.slice(0, 1)}
        </p>
      )}
    </div>
  );
};

export default ProfileImage;
