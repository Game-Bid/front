'use client';

import {FormProvider, useForm} from "react-hook-form";
import MyPageTitle from "@/components/my-page/MyPageTitle";
import FormLabelTextInput from "@/components/common/form/FormLabelTextInput";
import FormLabelPasswordInput from "@/components/common/form/FormLabelPasswordInput";
import FormLabelMultiInput from "@/components/common/form/FormLabelMultiInput";
import FormLabelDropdown from "@/components/common/form/FormLabelDropdown";
import CustomButton from "@/components/common/CustomButton";
import CustomIcon from "@/Icons";
import Button from "@/components/common/Button";
import {useGetMyPageUserInfo} from "@/hooks/fetcher/mypage/useGetMyPageUserInfo";
import {useGetGames} from "@/hooks/fetcher/game/useGetGames";
import {useRouter} from "next/navigation";
import {GameList} from "@/_types/game/game";
import {usePostMyPageUserInfo} from "@/hooks/fetcher/mypage/usePostMyPageUserInfo";
import {MyPageUserInfoRequest} from "@/services/myPage/postMyPageUserInfo";
import {DropdownType} from "@/components/common/Dropdown";
import {useEffect} from "react";

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


const MyPageForm = () => {
    const {data: userInfo} = useGetMyPageUserInfo();
    const {data: gamesData} = useGetGames();
    const router = useRouter();
    const gameDropdown = ((gamesData?.result ?? []) as GameList)
        .map(({name, id}) => ({
            label: name,
            value: id.toString()
        }));
    const form = useForm<MyPageUserInfoFormData>();
    const {mutate: submit} = usePostMyPageUserInfo();

    useEffect(() => {
        if (userInfo?.result && gamesData?.result) {
            const {nickname, name, phoneNumber, birthDate, favoriteGame} = userInfo.result;

            form.reset({
                nickname,
                name,
                password: '',
                passwordConfirm: '',
                phoneNumber: {
                    first: phoneNumber.substring(0, 3),
                    middle: phoneNumber.substring(3, 7),
                    last: phoneNumber.substring(7, 11),
                },
                birthDate: {
                    year: birthDate.split('-')[0],
                    month: birthDate.split('-')[1],
                    day: birthDate.split('-')[2],
                },
                favoriteGame: (gamesData.result as GameList)
                    .map(({name, id}) => ({
                        label: name,
                        value: id.toString()
                    }))
                    .find(game => game.label === favoriteGame)
            });
        }
    }, [userInfo, gamesData]);

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
        <FormProvider {...form}>
            <div className={'flex flex-col gap-l-4'}>
                <MyPageTitle/>
                <div className="self-stretch inline-flex flex-col flex-1 justify-start items-start gap-[32px]">
                    {/*<FormLabelProfileInput label={'프로필'} name={'profile'} nickname={'test'}/>*/}
                    <FormLabelTextInput label={'닉네임'} name={'nickname'} rules={{required: "필수 입력 항목입니다."}}/>
                    <FormLabelPasswordInput label={'새 비밀번호'}
                                            name={'password'}/>
                    <FormLabelPasswordInput label={'새 비밀번호 확인'}
                                            name={'passwordConfirm'} isConfirm/>
                    <FormLabelPasswordInput label={'비밀번호'}
                                            name={'existingPassword'}/>
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
                <Button title={'취소'}
                        variant={'secondary'}
                        onClick={() => router.push('/my-page')}
                        className={'w-full'}/>
            </div>
        </FormProvider>
    );
};

export default MyPageForm;