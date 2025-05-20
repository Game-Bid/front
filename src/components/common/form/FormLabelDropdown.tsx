import React from 'react';
import {Controller, RegisterOptions, useFormContext} from "react-hook-form";
import Dropdown, {DropdownType} from "@/components/common/Dropdown";

interface FormLabelDropdownProps {
    label: string;
    name: string;
    rules?: RegisterOptions;
    disabled?: boolean;
    warning?: boolean;
    listData: DropdownType[];
}

const FormLabelDropdown = ({
                               label,
                               name,
                               rules,
                               disabled = false,
                               warning = false,
                               listData
                           }: FormLabelDropdownProps) => {
    const {control} = useFormContext();

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
                    <Dropdown width="100%"
                              listData={listData}
                              placeholder=""
                              select={field.value ?? null}
                              setSelect={select => field.onChange({target: {value: select}})}/>
                )}
            />
        </div>
    );
};

export default FormLabelDropdown;