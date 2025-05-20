'use client'

import ProfileImage from "@/components/common/ProfileImage";
import CustomButton from "@/components/common/CustomButton";
import CustomIcon from "@/Icons";
import {useRouter} from "next/navigation";

export interface MyPageProfileData {
    nickname: string;
    email: string;
    profileUrl: string | null;
    penaltyCount: number;
    idCertified: boolean;
    accountCertified: boolean;
    phoneCertified: boolean;
}


const MyPageProfile = ({
                           nickname,
                           email,
                           profileUrl,
                           // penaltyCount,
                           // idCertified,
                           // accountCertified,
                           // phoneCertified
                       }: MyPageProfileData) => {

    const router = useRouter();
    const onClickEditMyPage = () => {
        router.push('/my-page/edit');
    }

    return (
        <div
            className={'bg-bgGrayDepth2 rounded-lg p-l-2 flex justify-between items-center self-stretch leading-[1.4]'}>
            <div className={'flex items-center justify-center gap-l-1'}>
                <ProfileImage src={profileUrl ?? ''} nickname={nickname} hover={false}/>
                <div className={'flex flex-col gap-l-0.25'}>
                    <div className={'flex items-center gap-l-0.5'}>
                        <div className={'text-2.25 leading-[1.3]'}>{nickname}</div>
                        {/*<div*/}
                        {/*    className={'text-0.75 text-fgGrayDisabled font-normal flex p-l-0.25 justify-center items-center gap-[10px] rounded-max border border-fgGrayDisabled py-l-0.25 px-l-0.5'}>패널티 {penaltyCount}회*/}
                        {/*</div>*/}
                    </div>
                    <span className={'text-1.125 text-fgGrayDisabled font-normal'}>{email}</span>
                    {/*<div className={'flex pt-l-0.5 gap-l-0.75'}>*/}
                    {/*    <StateChip succeed={idCertified} label={'신분증 인증'}/>*/}
                    {/*    <StateChip succeed={accountCertified} label={'계좌 인증'}/>*/}
                    {/*    <StateChip succeed={phoneCertified} label={'휴대폰 인증'}/>*/}
                    {/*</div>*/}
                </div>
            </div>
            <CustomButton variant={'secondary'}
                          onClick={onClickEditMyPage}
                          className={'flex text-fgGrayDefault leading-[1.4] gap-0.25'}>
                <CustomIcon icon={'EDIT-04'} className={'w-[24px] h-[24px]'} fill={'#EFEFF0'}/>
                <div>회원 정보 수정</div>
            </CustomButton>
        </div>
    );
};

export default MyPageProfile;