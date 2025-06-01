'use client'

import Tab from "@/components/common/tab/Tab";
import {useRouter, useSearchParams} from "next/navigation";
import Dropdown, {DropdownType} from "@/components/common/Dropdown";
import Chip from "@/components/common/Chip";
import React from "react";
import {formatNumberWithCommas} from "@/_utils/NumberUtils";

const BID_STATUS = [
    {
        label: '현재 입찰중',
        value: 'progress'
    }, {
        label: '지난 입찰',
        value: 'closed'
    }
];

const BID_HISTORY_FILTER = [
    {
        label: '모두',
        value: 'all',
    }, {
        label: '아이템',
        value: 'item',
    },
    {
        label: '계정',
        value: 'account'
    }
];

const BID_HISTORY_SORT: DropdownType[] = [
    {
        label: '최신순',
        value: 'date_asc'
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
            <div className={'flex justify-between items-center self-stretch'}>
                <div className={'flex items-start gap-0.75'}>
                    {
                        BID_HISTORY_FILTER.map((item) => (
                            <Chip key={item.value}
                                  listData={{
                                      ...item,
                                      label: `${item.label} ${formatNumberWithCommas(1234)}`,
                                  }}
                                  selected={filter === item.value}
                                  onClick={(value) => updateQueryString(status, value)}/>))
                    }
                </div>
                <div className={'w-[200px] h-[48px]'}>
                    <Dropdown listData={BID_HISTORY_SORT}
                              select={BID_HISTORY_SORT.find(item => item.value === sort) ?? BID_HISTORY_SORT[0]}
                              setSelect={(value) => updateQueryString(status, filter, value?.value)}/>
                </div>
            </div>
        </div>
    );
};

export default BidHistoryTop;