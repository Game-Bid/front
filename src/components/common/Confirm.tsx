import { AnimatePresence, motion } from "motion/react";
import React from "react";
import Button from "./Button";
import CustomIcon from "@/Icons/Icon";
import { IconList } from "@/Icons";

interface ConfirmProps {
  isOpen: boolean;
  title: string;
  description: string;
  falseSubmit: () => void;
  trueSubmit: () => void;
  falseButtonTitle?: string;
  trueButtonTitle?: string;
  icon?: boolean;
  customIcon?: string;
}

const Confirm = ({
  isOpen,
  title,
  description,
  falseSubmit,
  trueSubmit,
  falseButtonTitle = "취소",
  trueButtonTitle = "확인",
  icon = false,
  customIcon,
}: ConfirmProps) => {
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

            <div className="flex gap-4 justify-between w-full">
              <Button
                title={falseButtonTitle}
                size="md"
                variant={"secondary"}
                onClick={falseSubmit}
                width="100%"
              />
              <Button
                title={trueButtonTitle}
                size="md"
                variant={"primary"}
                onClick={trueSubmit}
                width="100%"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Confirm;
