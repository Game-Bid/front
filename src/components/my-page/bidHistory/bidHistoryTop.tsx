'use client'

import Tab from "@/components/common/tab/Tab";
import {useRouter, useSearchParams} from "next/navigation";
import React from "react";
import MyPageBidCommonTop from "@/components/my-page/MyPageBidCommonTop";

const BID_STATUS = [
    {
        label: '현재 입찰중',
        value: 'progress'
    }, {
        label: '지난 입찰',
        value: 'closed'
    }
];

const BidHistoryTop = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const status = searchParams.get('status') ?? 'progress';

    const updateQueryString = (
        targetStatus: string = status) => {

        const params = new URLSearchParams(searchParams.toString());
        params.set('status', targetStatus);

        router.push(`?${params}`);
    }

    return (
        <div className={'flex flex-col mt-l-2 justify-center items-center gap-l-2 flex-1 md:mt-0'}>
            <Tab tabs={BID_STATUS} activeTab={status} onTabChange={(value) => updateQueryString(value)}/>
            <MyPageBidCommonTop/>
        </div>
    );
};

export default BidHistoryTop;