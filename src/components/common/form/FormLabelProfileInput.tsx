import {Controller, useFormContext} from "react-hook-form";
import React from "react";
import ProfileImage from "@/components/common/ProfileImage";

interface FormLabelProfileProps {
    label: string;
    name: string;
    nickname: string;
}

const FormLabelProfileInput = ({label, name, nickname}: FormLabelProfileProps) => {
    const {control} = useFormContext();

    const id = `form-${name}-profile-input`;

    return (
        <div className={'self-stretch flex flex-col items-start gap-[8px]'}>
            <div className={'self-stretch flex justify-center items-center gap-[10px]'}>
                <label htmlFor={id}
                       className={'flex-1 justify-start text-fgGrayDefault text-lg font-normal leading-relaxed'}>{label}</label>
            </div>
            <Controller
                control={control}
                name={name}
                render={({field}) => (
                    <ProfileImage nickname={nickname} src={field.value ?? null} setFile={field.onChange}/>
                )}
            />
        </div>
    );
};

export default FormLabelProfileInput;