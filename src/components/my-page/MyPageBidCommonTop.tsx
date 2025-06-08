'use client'

import React from "react";
import Chip from "@/components/common/Chip";
import {useRouter, useSearchParams} from "next/navigation";
import Dropdown, {DropdownType} from "@/components/common/Dropdown";

const PAYMENTS_FILTER = [
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

const PAYMENTS_SORT: DropdownType[] = [
    {
        label: '최신순',
        value: 'date_asc'
    },
    {
        label: '조회수순',
        value: 'view_desc'
    },
    {
        label: '마감 임박순',
        value: 'deadline_asc'
    },
    {
        label: '가격 낮은순',
        value: 'price_asc'
    },
    {
        label: '가격 높은순',
        value: 'price_desc'
    },
]

const MyPageBidCommonTop = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = searchParams.get('filter') ?? 'all';
    const sort = searchParams.get('sort') ?? 'date_asc';

    const updateQueryString = (targetQuery: { [key: string]: string }) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(targetQuery).forEach(([key, value]) => {
            params.set(key, value);
        });

        router.push(`?${params}`);
    }

    return (
        <div
            className={'flex flex-col items-start gap-l-2 mt-l-2 md:flex-row md:mt-0 md:justify-between md:items-center self-stretch'}>
            <div className={'flex items-start gap-0.75'}>
                {
                    PAYMENTS_FILTER.map((item) => (
                        <Chip key={item.value}
                              listData={item}
                              selected={filter === item.value}
                              onClick={(value) => updateQueryString({filter: value})}/>))
                }
            </div>
            <div className={'w-[200px] h-[48px]'}>
                <Dropdown listData={PAYMENTS_SORT}
                          select={PAYMENTS_SORT.find(item => item.value === sort) ?? PAYMENTS_SORT[0]}
                          setSelect={(value) => updateQueryString({sort: value?.value ?? 'date_asc'})}/>
            </div>
        </div>
    );
};

export default MyPageBidCommonTop;