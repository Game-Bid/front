import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface NameSectionProps {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
}

const NameSection = ({ register, watch, setValue }: NameSectionProps) => {
  const name = watch("name");

  const clearField = (field: keyof SignUpFormData) => {
    setValue(field, "", { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name" className="text-[18px] text-fgGrayDefault">
        이름
      </label>
      <div className="relative">
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
          placeholder="본인의 이름을 입력해주세요."
          className="w-full h-[48px] px-3 rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
        />
        {name && (
          <div className="flex gap-[10px] absolute right-2 top-1/2 transform -translate-y-1/2">
            <button type="button" onClick={() => clearField("name")}>
              <CustomIcon icon="CLOSE_SVG" className="w-[24px] h-[24px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameSection;
