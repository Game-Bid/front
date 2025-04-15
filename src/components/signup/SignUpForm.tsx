"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import EmailSection from "@/components/signup/EmailSection";
import PasswordSection from "@/components/signup/PasswordSection";
import ConfirmPasswordSection from "@/components/signup/ConfirmPasswordSection";
import NameSection from "@/components/signup/NameSection";
import PhoneNumberSection from "@/components/signup/PhoneNumberSection";
import BirthSection from "@/components/signup/BirthSection";
import FavoriteGameSection from "@/components/signup/FavoriteGameSection";
import AgreementSection from "@/components/signup/AgreementSection";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import NextFind from "../find/NextFind";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const [favoriteGame, setFavoriteGame] = useState("");
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const onSubmit = (data: SignUpFormData) => {
    console.log("회원가입 제출 데이터:", data);
  };

  console.log(setValue, errors, isGameModalOpen, setFavoriteGame);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <EmailSection register={register} watch={watch} />

      <PasswordSection register={register} />
      <ConfirmPasswordSection register={register} />
      <NameSection register={register} />
      <PhoneNumberSection register={register} />
      <BirthSection register={register} />
      <FavoriteGameSection
        favoriteGame={favoriteGame}
        setIsGameModalOpen={setIsGameModalOpen}
        register={register}
      />
      <AgreementSection />

      <div className="flex flex-col gap-5">
        <button
          type="submit"
          className="w-full min-h-[48px] px-3 rounded-[12px] bg-fillPrimaryDisabled"
        >
          회원가입
        </button>
        <NextFind />
      </div>
    </form>
  );
};

export default SignUpForm;
