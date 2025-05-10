import { UseFormRegister } from "react-hook-form";
import { SignUpFormData } from "@/_types/signup/SignUpFormData";
import CustomIcon from "@/Icons";
import { cn } from "@/_utils/clsx";

interface Props {
  favoriteGame: string;
  setIsGameModalOpen: (open: boolean) => void;
  register: UseFormRegister<SignUpFormData>;
}

const FavoriteGameSection = ({
  favoriteGame,
  setIsGameModalOpen,
  register,
}: Props) => {
  return (
    <div className="flex flex-col gap-[8px] relative ">
      <label htmlFor="favoriteGame" className="text-1.125 text-fgGrayDefault">
        관심 게임
      </label>
      <div onClick={() => setIsGameModalOpen(true)}>
        <input
          id="favoriteGame"
          type="text"
          placeholder="게임을 선택해주세요."
          readOnly
          className={cn(
            "w-full h-[48px] px-0.75 pr-0.75 rounded-md bg-fillGrayDefault cursor-pointer"
          )}
          value={favoriteGame}
          {...register("favoriteGame", { required: true })}
        />
        <button
          type="button"
          className="absolute right-0.5 bottom-[0.8px] -translate-y-1/2 transform"
        >
          <CustomIcon icon="DROPDOWN_ARROW_SVG" className="w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default FavoriteGameSection;
