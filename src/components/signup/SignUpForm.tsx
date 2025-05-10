"use client";

import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import EmailSection from "@/components/signup/EmailSection";
import PasswordSection from "@/components/signup/PasswordSection";
import NameSection from "@/components/signup/NameSection";
import PhoneNumberSection from "@/components/signup/PhoneNumberSection";
import BirthSection from "@/components/signup/BirthSection";
import FavoriteGameSection from "@/components/signup/FavoriteGameSection";
import AgreementSection from "@/components/signup/AgreementSection";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import SignUpGameModal from "../modal/SignUpGameModal";
import { cn } from "@/_utils/clsx";
import LoginButton from "../login/LoginButton";
import { useRegister } from "@/hooks/fetcher/signup/usePostRegister";
import { PostRegisterProps } from "@/services/signup/postRegister";
import { generateRandomNickname } from "@/_utils/signup/generateRandomNickname";
import Link from "next/link";
import Button from "../common/Button";

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

  const [favoriteGame, setFavoriteGame] = useState("");
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const { mutate: signup } = useRegister();
  const randomNickname = useMemo(() => generateRandomNickname(), []);

  useEffect(() => {
    setNickname(randomNickname);
    setValue("nickname", randomNickname);
  }, [randomNickname, setValue]);

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px] w-full tablet:mx-[24px]"
      >
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

        <div className="flex-center flex-col gap-[20px]">
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
          <Link href={"/"}>
            <Button title="다음에 가입" variant="tertiary" />
          </Link>
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
