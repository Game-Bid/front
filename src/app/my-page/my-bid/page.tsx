import React, {Suspense} from 'react';
import MyPageBidCommonTop from "@/components/my-page/MyPageBidCommonTop";
import MyPageEmptyBid from "@/components/my-page/MyPageEmptyBid";
import MyPageTitle from "@/components/my-page/MyPageTitle";

const MyPageMyBid = () => {
    return (
        <div className={'w-full md:mt-l-4 md:w-[793px] flex flex-col gap-l-2 flex-start self-stretch font-semibold text-fgGrayDefault'}>
            <MyPageTitle/>
            <Suspense>
                <MyPageBidCommonTop/>
            </Suspense>
            <MyPageEmptyBid label={'내 경매글이 없습니다'}/>
        </div>
    );
};

export default MyPageMyBid;