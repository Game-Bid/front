"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import LoginButton from "../login/LoginButton";
import { useRegister } from "@/hooks/fetcher/signup/usePostRegister";
import { PostRegisterProps } from "@/services/signup/postRegister";
import { generateRandomNickname } from "@/_utils/signup/RandomNick";

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
  const [nickname, setNickname] = useState("");
  const { mutate: signup, isPending, isError } = useRegister();

  useEffect(() => {
    const nick = generateRandomNickname();
    setNickname(nick);
    setValue("nickname", nick);
  }, []);

  const birth = watch("birth");

  const isBirthComplete =
    birth?.year?.length === 4 &&
    birth?.month?.length === 2 &&
    birth?.day?.length === 2;

  const isFormReady = isBirthComplete && isValid;

  const onSubmit = (data: SignUpFormData) => {
    const { email, password, name, birth, favoriteGame, phoneNum } = data;
    const birthDate = `${birth.year}-${birth.month}-${birth.day}`;
    const phoneNumber = `${phoneNum.first}${phoneNum.middle}${phoneNum.last}`;

    const formData: PostRegisterProps = {
      email,
      password,
      name,
      birthDate,
      phoneNumber,
      favoriteGame,
      nickname,
    };

    signup(formData);
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
          <LoginButton
            isType="submit"
            isDisabled={!isFormReady}
            isClassName={cn(
              isFormReady
                ? "bg-fillPrimaryDefault text-fgPrimaryDefault"
                : "bg-fillPrimaryDisabled text-fgPrimaryDisabled",
              "transition-colors"
            )}
            isText="회원가입"
          />
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
