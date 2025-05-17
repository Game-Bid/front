import {InputHTMLAttributes, ReactElement} from "react";

interface InputWithSubfixProps extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    warning?: boolean;
    children: ReactElement
}

const InputWithSubfix = ({
                             disabled = false,
                             warning = false,
                             children,
                             ...props
                         }: InputWithSubfixProps) => {

    return (
        <div
            className={`self-stretch h-[48px] px-[12px] bg-fillGrayDefault rounded-xl inline-flex justify-start items-center ${disabled ? 'bg-fillGrayDisabled' : 'bg-fillGrayDefault'}
             ${warning && 'border border-systemFailed'}`}>
            <div className={'flex-1 flex justify-between items-center'}>
                <input
                    className={`block w-full flex-1 justify-start text-fgGrayFocused text-base font-normal leading-snug bg-transparent`}
                    {...props}
                    disabled={disabled}
                />
                {children}
            </div>
        </div>
    );
};

export default InputWithSubfix;
