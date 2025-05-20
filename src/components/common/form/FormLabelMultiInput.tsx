import React, {InputHTMLAttributes} from 'react';
import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import InputWithSubfix from "@/components/common/input/InputWithSubfix";
import CustomIcon from "@/Icons";

interface FormLabelMultiInputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    names: string[];
    rules?: RegisterOptions[]
    unit?: string;
}

const FormLabelMultiInput = ({names, label, rules, unit, ...props}: FormLabelMultiInputProps) => {
    const {control, setValue} = useFormContext();

    const baseId = `form-${names[0]}-multi-input`;

    return (
        <div className="self-stretch h-[81px] inline-flex flex-col justify-start items-start gap-[8px]">
            <div className="self-stretch inline-flex justify-center items-center gap-[10px]">
                <label htmlFor={baseId} className="flex-1 text-fgGrayDefault text-lg font-normal leading-relaxed">
                    {label}
                </label>
            </div>

            <div className="self-stretch inline-flex justify-start items-center gap-[12px]">
                {names.map((name, index) => (
                    <React.Fragment key={name}>
                        <div className="flex items-center gap-[12px] self-stretch">
                            <Controller
                                control={control}
                                name={name}
                                rules={rules?.[index]}
                                render={({field}) => (
                                    <InputWithSubfix
                                        {...field}
                                        {...props}
                                        id={`${baseId}-${index}`}
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                    >
                                        {field.value && (
                                            <button
                                                type="button"
                                                onClick={() => setValue(name, '', {shouldValidate: true})}
                                                className=""
                                            >
                                                <CustomIcon icon="CLOSE_SVG" className="w-[24px] h-[24px]"/>
                                            </button>
                                        )}
                                    </InputWithSubfix>
                                )}
                            />
                        </div>

                        {(unit && index < names.length - 1) && (
                            <div className="text-center text-base font-normal leading-snug">{unit}</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default FormLabelMultiInput;
