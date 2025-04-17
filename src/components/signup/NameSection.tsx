import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import TextInput from "../common/input/TextInput";

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
      <TextInput<SignUpFormData>
        id="name"
        name="name"
        type="name"
        placeholder="본인의 이름을 입력해주세요."
        register={register}
        className="w-full h-[48px] px-3 rounded-[12px] bg-fillGrayDefault focus:border focus:border-borderPrimary"
        required={true}
        rightElement={
          name && (
            <button type="button" onClick={() => clearField("name")}>
              <CustomIcon icon="CLOSE_SVG" className="w-[24px] h-[24px]" />
            </button>
          )
        }
      />
    </div>
  );
};

export default NameSection;
