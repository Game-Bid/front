'use client'

import React, {InputHTMLAttributes, useState} from 'react';
import {Controller, useFormContext} from "react-hook-form";
import InputWithSubfix from "@/components/common/input/InputWithSubfix";
import CustomIcon from "@/Icons";

interface FormLabelPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    disabled?: boolean;
    warning?: boolean;
    isConfirm?: boolean;
    watchTarget?: string;
    isRequired?: boolean;
}

const FormLabelPasswordInput = ({
                                    label,
                                    name,
                                    disabled = false,
                                    warning = false,
                                    isConfirm = false,
                                    isRequired=false,
                                    watchTarget,
                                    ...props
                                }: FormLabelPasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const {control, setValue, watch} = useFormContext();

    const id = `form-${name}-input`;
    const passwordValue = watch(watchTarget ?? 'password');


    return (
        <div className={'self-stretch h-[81px] inline-flex flex-col justify-start items-start gap-[8px]'}>
            <div className={'self-stretch inline-flex justify-center items-center gap-[10px]'}>
                <label htmlFor={id}
                       className={'flex-1 justify-start text-fgGrayDefault text-lg font-normal leading-relaxed'}>{label}</label>
            </div>
            <Controller
                control={control}
                name={name}
                rules={{
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                        message: '영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
                    },
                    validate: (value) => {
                        if (isConfirm && value !== passwordValue) {
                            return '비밀번호가 일치하지 않습니다.';
                        }

                        return true;
                    },
                    ...(isRequired && {required: "필수 입력 항목입니다."})
                }}
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