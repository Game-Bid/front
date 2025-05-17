'use client'

import React, {InputHTMLAttributes, useState} from 'react';
import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import InputWithSubfix from "@/components/common/input/InputWithSubfix";
import CustomIcon from "@/Icons";

interface FormLabelPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    rules?: RegisterOptions;
    disabled?: boolean;
    warning?: boolean;
}

const FormLabelPasswordInput = ({
                                    label,
                                    name,
                                    rules,
                                    disabled = false,
                                    warning = false,
                                    ...props
                                }: FormLabelPasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const {control, setValue} = useFormContext();

    const id = `form-${name}-input`;

    return (
        <div className={'self-stretch h-[81px] inline-flex flex-col justify-start items-start gap-[8px]'}>
            <div className={'self-stretch inline-flex justify-center items-center gap-[10px]'}>
                <label htmlFor={id}
                       className={'flex-1 justify-start text-fgGrayDefault text-lg font-normal leading-relaxed'}>{label}</label>
            </div>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({field}) => (
                    <InputWithSubfix
                        {...field}
                        id={id}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        disabled={disabled}
                        warning={warning}
                        type={showPassword ? 'text' : 'password'}
                        {...props}
                    >
                        <div className={'flex gap-0.5'}>
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className={''}
                            >
                                <CustomIcon icon={showPassword ? 'CLOSE_EYE_SVG' : 'EYE_SVG'}
                                            className={'w-[24px] h-[24px]'}/>
                            </button>
                            {field.value && <button
                                onClick={() => setValue(name, "", {shouldValidate: true})}
                                className={''}
                            >
                                <CustomIcon icon='CLOSE_SVG' className={'w-[24px] h-[24px]'}/>
                            </button>}
                        </div>
                    </InputWithSubfix>
                )}
            />
        </div>
    );
};

export default FormLabelPasswordInput;