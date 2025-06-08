import BidHistoryTop from "@/components/my-page/bidHistory/bidHistoryTop";
import React, {Suspense} from "react";
import MyPageEmptyBid from "@/components/my-page/MyPageEmptyBid";
import MyPageTitle from "@/components/my-page/MyPageTitle";

const Page = () => {
    return (
        <div className={'w-full md:mt-l-4 md:w-[793px] flex flex-col gap-l-2 flex-start self-stretch font-semibold text-fgGrayDefault'}>
            <MyPageTitle/>
            <Suspense>
                <BidHistoryTop/>
            </Suspense>
            <MyPageEmptyBid label={'경매 내역이 없습니다'}/>
        </div>
    );
};

export default Page;