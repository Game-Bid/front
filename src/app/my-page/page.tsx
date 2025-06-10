'use client'

import MyPageProfile from "@/components/my-page/myPage/MyPageProfile";
import MyPagePoint from "@/components/my-page/myPage/MyPagePoint";
import BidHistory from "@/components/my-page/myPage/BidHistory";
import MyPageTitle from "@/components/my-page/MyPageTitle";
import React from "react";
import {useGetMyPageUserInfo} from "@/hooks/fetcher/mypage/useGetMyPageUserInfo";

const SUB_TITLE_STYLE = 'text-1.25 mb-l-0.5';
const Page = () => {
    const {data} = useGetMyPageUserInfo();
    const userInfo = data?.result;
    const SECTION_STYLE = 'flex flex-col items-start gap-l-0.5 self-stretch';


    return <div
        className={'w-full md:w-[793px] flex flex-col flex-start self-stretch font-semibold text-fgGrayDefault'}>
        <div className={'flex flex-col gap-l-4 mt-l-4'}>
            <MyPageTitle/>
            <div className={SECTION_STYLE}>
                <p className={SUB_TITLE_STYLE}>프로필</p>
                <MyPageProfile
                    nickname={userInfo?.nickname ?? ''}
                    email={userInfo?.email ?? ''}
                    profileUrl={userInfo?.profileImage ?? null}
                    penaltyCount={0}
                    idCertified={false}
                    accountCertified={true}
                    phoneCertified={true}
                />
            </div>
            <div className={SECTION_STYLE}>
                <p className={SUB_TITLE_STYLE}>포인트</p>
                <MyPagePoint point={0}/>
            </div>
            <div className={SECTION_STYLE}>
                <p className={SUB_TITLE_STYLE}>거래 현황</p>
                <BidHistory bidCount={
                    (userInfo?.sellerRating ?? 0) +
                    (userInfo?.buyerRating ?? 0) +
                    (userInfo?.pointBalance ?? 0)
                } purchaseCount={userInfo?.sellerRating ?? 0}
                            myBidCount={userInfo?.buyerRating ?? 0} bidHistoryCount={userInfo?.pointBalance ?? 0}/>
            </div>
            {/*<div className={SECTION_STYLE}>*/}
            {/*    <p className={SUB_TITLE_STYLE}>경매 레벨</p>*/}
            {/*</div>*/}
        </div>
    </div>;
};

export default Page;

