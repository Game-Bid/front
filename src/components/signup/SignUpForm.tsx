"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import EmailSection from "@/components/signup/EmailSection";
import PasswordSection from "@/components/signup/PasswordSection";
import NameSection from "@/components/signup/NameSection";
import PhoneNumberSection from "@/components/signup/PhoneNumberSection";
import BirthSection from "@/components/signup/BirthSection";
import FavoriteGameSection from "@/components/signup/FavoriteGameSection";
import AgreementSection from "@/components/signup/AgreementSection";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import NextFind from "../find/NextFind";
import SignUpGameModal from "../modal/SignUpGameModal";
import { cn } from "@/_utils/clsx";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<SignUpFormData>({ mode: "onChange" });

  const router = useRouter();
  const [favoriteGame, setFavoriteGame] = useState("");
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const onSubmit = (data: SignUpFormData) => {
    console.log("회원가입 제출 데이터:", data);
    router.push("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <EmailSection register={register} watch={watch} />
        <PasswordSection
          register={register}
          watch={watch}
          setValue={setValue}
        />
        <NameSection register={register} watch={watch} setValue={setValue} />
        <PhoneNumberSection register={register} />
        <BirthSection register={register} />
        <FavoriteGameSection
          favoriteGame={favoriteGame}
          setIsGameModalOpen={setIsGameModalOpen}
          register={register}
        />
        <AgreementSection
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <div className="flex flex-col gap-5">
          <button
            type="submit"
            disabled={!isValid}
            className={cn(
              "w-full min-h-[48px] px-3 rounded-[12px]",
              isValid
                ? "bg-fillPrimaryDefault text-fgPrimaryDefault"
                : "bg-fillPrimaryDisabled text-fgPrimaryDisabled",
              "transition-colors"
            )}
          >
            회원가입
          </button>
          <NextFind />
        </div>
      </form>
      {isGameModalOpen && (
        <SignUpGameModal
          activeModal={isGameModalOpen}
          onClose={() => setIsGameModalOpen(false)}
          onSelectGame={(game) => {
            setFavoriteGame(game);
            setValue("favoriteGame", game);
          }}
        />
      )}
    </>
  );
};

export default SignUpForm;
