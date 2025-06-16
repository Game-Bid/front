import { AnimatePresence, motion } from "motion/react";
import React, { ReactNode } from "react";
import Button from "./Button";
import CustomIcon from "@/Icons/Icon";
import { IconList } from "@/Icons";
import { ModalPortal } from "./Portal";

interface ConfirmProps {
  isOpen: boolean;
  title: string | ReactNode;
  description: string | ReactNode;
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
        <ModalPortal title="confirm-modal">
          <div
            className={`fixed inset-0 flex-center z-[100] bg-black bg-opacity-80`}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-[400px] tablet:w-[300px] rounded-lg bg-bgGrayDepth3 p-1.5 flex-center flex-col gap-1.5"
            >
              <div className="flex-center flex-col gap-1">
                {icon && (
                  <div className="rounded-max bg-fillGrayFocused w-[48px] h-[48px] tablet:w-[36px] tablet:h-[36px] flex-center">
                    <CustomIcon
                      icon={customIcon as IconList}
                      className="w-[24px] h-[24px] tablet:w-[18px] tablet:h-[18px]"
                    />
                  </div>
                )}
                <div className="flex-center flex-col gap-0.25 leading-[1.4]">
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

              <div className="flex gap-0.5 justify-between w-full">
                <Button
                  title={falseButtonTitle}
                  variant={"secondary"}
                  onClick={falseSubmit}
                  width="100%"
                />
                <Button
                  title={trueButtonTitle}
                  variant={"primary"}
                  onClick={trueSubmit}
                  width="100%"
                />
              </div>
            </motion.div>
          </div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
};

export default Confirm;
