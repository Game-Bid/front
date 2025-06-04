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
    const filter = searchParams.get('filter') ?? 'all';
    const sort = searchParams.get('sort') ?? 'date_asc';

    const updateQueryString = (
        targetStatus: string = status,
        targetFilter: string = filter,
        targetSort: string = sort) => {
        router.push(`/my-page/bid-history?status=${targetStatus}&filter=${targetFilter}&sort=${targetSort}`);
    }

    return (
        <div className={'flex flex-col justify-center items-center gap-l-2 flex-1'}>
            <Tab tabs={BID_STATUS} activeTab={status} onTabChange={(value) => updateQueryString(value)}/>
            <MyPageBidCommonTop basePath={`/my-page/bid-history?status=${status}`}/>
        </div>
    );
};

export default BidHistoryTop;