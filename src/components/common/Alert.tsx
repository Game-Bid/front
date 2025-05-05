import { AnimatePresence, motion } from "motion/react";
import React from "react";
import Button from "./Button";
import CustomIcon from "@/Icons/Icon";
import { IconList } from "@/Icons";

interface AlertProps {
  isOpen: boolean;
  onSumbit: () => void;
  title: string;
  description: string;
  buttonTtile?: string;
  icon?: boolean;
  customIcon?: string;
}

const Alert = ({
  isOpen,
  onSumbit,
  title,
  description,
  buttonTtile = "확인",
  icon = false,
  customIcon,
}: AlertProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 flex-center z-[100] bg-black bg-opacity-80`}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-[400px] rounded-lg bg-bgGrayDepth3 p-24 flex-center flex-col gap-24"
          >
            <div className="flex-center flex-col gap-16">
              {icon && (
                <div className="rounded-max bg-fillGrayFocused w-[48px] h-[48px] flex-center">
                  <CustomIcon
                    icon={customIcon as IconList}
                    className="w-[24px] h-[24px]"
                  />
                </div>
              )}
              <div className="flex-center flex-col gap-4 leading-[1.4]">
                <div
                  className="font-semibold text-fgGrayDefault text-[1.125rem] tracking-[-0.36px]
  "
                >
                  {title}
                </div>
                <div className="text-fgGrayPlaceholder text-[0.875rem] tracking-[-0.28px]">
                  {description}
                </div>
              </div>
            </div>

            <Button
              title={buttonTtile}
              size="md"
              value={"primary"}
              onClick={onSumbit}
              width="100%"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
