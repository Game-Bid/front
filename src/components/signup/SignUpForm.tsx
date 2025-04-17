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
import { showToast } from "../common/Toast";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    mode: "onChange",
  });

  const router = useRouter();
  const [favoriteGame, setFavoriteGame] = useState("");
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const birth = watch("birth");

  const isBirthComplete =
    birth?.year?.length === 4 &&
    birth?.month?.length === 2 &&
    birth?.day?.length === 2;

  const isFormReady = isBirthComplete && isValid;

  const onSubmit = (data: SignUpFormData) => {
    console.log("회원가입 제출 데이터:", data);
    router.push("/");
    showToast("success", "회원가입이 완료되었습니다.", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <EmailSection register={register} watch={watch} errors={errors} />
        <PasswordSection
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
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
            disabled={!isFormReady}
            className={cn(
              "w-full min-h-[48px] px-3 rounded-[12px]",
              isFormReady
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
