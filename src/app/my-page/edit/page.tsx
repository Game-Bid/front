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
import {MyPageUserInfoRequest} from "@/services/myPage/postMyPageUserInfo";
import {useGetGames} from "@/hooks/fetcher/game/useGetGames";
import {GameList} from "@/_types/game/game";
import {DropdownType} from "@/components/common/Dropdown";
import {usePostMyPageUserInfo} from "@/hooks/fetcher/mypage/usePostMyPageUserInfo";
import {useGetMyPageUserInfo} from "@/hooks/fetcher/mypage/useGetMyPageUserInfo";
import {useRouter} from "next/navigation";

interface MyPageUserInfoFormData extends Omit<MyPageUserInfoRequest, 'phoneNumber' | 'birthDate' | 'favoriteGame'> {
    phoneNumber: {
        first: string;
        middle: string;
        last: string;
    }
    birthDate: {
        year: string;
        month: string;
        day: string;
    },
    favoriteGame: DropdownType,
}


const MyPageEditPage = () => {
    const {data: userInfo} = useGetMyPageUserInfo();
    const {data: gamesData} = useGetGames();
    const router = useRouter();
    const gameDropdown = ((gamesData?.result ?? []) as GameList)
        .map(({name, id}) => ({
            label: name,
            value: id.toString()
        }));
    const form = useForm<MyPageUserInfoFormData>({
        defaultValues: {
            nickname: userInfo?.result?.nickname,
            name: userInfo?.result?.name,
            password: '',
            passwordConfirm: '',
            phoneNumber: {
                first: userInfo?.result?.phoneNumber.split('-')[0],
                middle: userInfo?.result?.phoneNumber.split('-')[1],
                last: userInfo?.result?.phoneNumber.split('-')[2],
            },
            birthDate: {
                year: userInfo?.result?.birthDate.split('-')[0],
                month: userInfo?.result?.birthDate.split('-')[1],
                day: userInfo?.result?.birthDate.split('-')[2],
            },
            favoriteGame: gameDropdown.find(game => game.label === userInfo?.result?.favoriteGame)
        }
    });
    const {mutate: submit} = usePostMyPageUserInfo();

    const onSubmit = (data: MyPageUserInfoFormData) => {
        const request = {
            ...data,
            phoneNumber: `${data.phoneNumber.first}-${data.phoneNumber.middle}-${data.phoneNumber.last}`,
            birthDate: `${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.year}`,
            favoriteGame: data.favoriteGame.label
        } as MyPageUserInfoRequest;

        submit(request, {
            onSuccess: () => {
                router.push('/my-page');
            },
        });
    };

    return (
        <div className={'w-full md:w-[793px] mt-l-2 md:mt-l-4 flex items-start gap-[20px] text-fgGrayDefault'}>
            <FormProvider {...form}>
                <div className={'flex flex-col gap-l-4'}>
                    <MyPageTitle/>
                    <div className="self-stretch inline-flex flex-col flex-1 justify-start items-start gap-[32px]">
                        {/*<FormLabelProfileInput label={'프로필'} name={'profile'} nickname={'test'}/>*/}
                        <FormLabelTextInput label={'닉네임'} name={'nickname'} rules={{required: "필수 입력 항목입니다."}}/>
                        <FormLabelPasswordInput label={'비밀번호'} name={'password'}/>
                        <FormLabelPasswordInput label={'비밀번호 확인'} name={'passwordConfirm'} isConfirm/>
                        <FormLabelTextInput label={'이름'} name={'name'} rules={{required: "필수 입력 항목입니다."}}/>
                        <FormLabelMultiInput label={'휴대폰 번호'}
                                             names={['phoneNumber.first', 'phoneNumber.middle', 'phoneNumber.last']}
                                             type={'number'}
                                             rules={[
                                                 {required: "필수 입력 항목입니다.", maxLength: 3},
                                                 {required: "필수 입력 항목입니다.", minLength: 3, maxLength: 4},
                                                 {required: "필수 입력 항목입니다.", minLength: 3, maxLength: 4},
                                             ]}
                                             unit={'-'}/>
                        <FormLabelMultiInput label={'생년월일'}
                                             rules={[{required: "필수 입력 항목입니다."}, {required: "필수 입력 항목입니다."}, {required: "필수 입력 항목입니다."}]}
                                             names={['birthDate.year', 'birthDate.month', 'birthDate.day']}
                                             type={'number'}
                                             unit={'-'}/>
                        <FormLabelDropdown label={'관심 게임'}
                                           rules={{required: "필수 입력 항목입니다."}}
                                           name={'favoriteGame'}
                                           listData={gameDropdown}/>
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