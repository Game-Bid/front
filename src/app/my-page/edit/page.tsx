'use client'

import CustomButton from "@/components/common/CustomButton";
import Button from "@/components/common/Button";
import {FormProvider, useForm} from "react-hook-form";
import FormLabelTextInput from "@/components/common/form/FormLabelTextInput";
import FormLabelPasswordInput from "@/components/common/form/FormLabelPasswordInput";
import FormLabelMultiInput from "@/components/common/form/FormLabelMultiInput";
import FormLabelDropdown from "@/components/common/form/FormLabelDropdown";
import CustomIcon from "@/Icons";
import MyPageTitle from "@/components/my-page/MyPageTitle";
import React from "react";

interface MyPageData {
    nickname: string;
    name: string;
    password: string;
    passwordConfirm: string;
}

const MyPageEditPage = () => {

    const form = useForm<MyPageData>({
        defaultValues: {
            nickname: '',
            name: ''
        }
    });

    const onSubmit = () => {
    }

    return (
        <div className={'w-full md:w-[793px] mt-l-2 md:mt-l-4 flex items-start gap-[20px] text-fgGrayDefault'}>
            <FormProvider {...form}>
                <div className={'flex flex-col gap-l-4'}>
                    <MyPageTitle/>
                    <div className="self-stretch inline-flex flex-col flex-1 justify-start items-start gap-[32px]">
                        {/*<FormLabelProfileInput label={'프로필'} name={'profile'} nickname={'test'}/>*/}
                        <FormLabelTextInput label={'닉네임'} name={'nickname'}/>
                        <FormLabelPasswordInput label={'비밀번호'} name={'password'}/>
                        <FormLabelPasswordInput label={'비밀번호 확인'} name={'passwordConfirm'}/>
                        <FormLabelTextInput label={'이름'} name={'name'}/>
                        <FormLabelMultiInput label={'휴대폰 번호'}
                                             names={['phone_first', 'phone_middle', 'phone_last']}
                                             type={'number'}
                                             rules={[
                                                 {maxLength: 3},
                                                 {minLength: 3, maxLength: 4},
                                                 {minLength: 3, maxLength: 4},
                                             ]}
                                             unit={'-'}/>
                        <FormLabelMultiInput label={'생년월일'}
                                             names={['year', 'month', 'day']}
                                             type={'number'}
                                             unit={'-'}/>
                        <FormLabelDropdown label={'관심 게임'} name={'game'} listData={[]}/>
                    </div>
                </div>
                <div className={'flex w-[183px] flex-col items-end gap-l-0.75 shrink-0'}>
                    <CustomButton className={'w-full h-[48px] p-0.75'} onClick={form.handleSubmit(onSubmit)}>
                        <CustomIcon icon={'SAVE-01'} className={'w-[24px] h-[24px]'}/>
                        <div>저장</div>
                    </CustomButton>
                    <Button title={'취소'} variant={'secondary'} className={'w-full'}/>
                </div>
            </FormProvider>
        </div>
    );
};

export default MyPageEditPage;