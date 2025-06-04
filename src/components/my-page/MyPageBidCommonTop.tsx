'use client'

import React from "react";
import Chip from "@/components/common/Chip";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
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
    }
]

interface MyPageBidCommonTopProps {
    extraQuery?: Record<string, string>;
}

const MyPageBidCommonTop = ({extraQuery}: MyPageBidCommonTopProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = searchParams.get('filter') ?? 'all';
    const sort = searchParams.get('sort') ?? 'date_asc';

    const path = usePathname();
    const pathName = `${path.split('/')[0]}/${path.split('/')[1]}`;


    const updateQueryString = (targetFilter: string = filter, targetSort: string = sort) => {
        const query = new URLSearchParams({
            filter: targetFilter,
            sort: targetSort,
            ...extraQuery,
        }).toString();
        router.push(`${pathName}?${query}`);
    }

    return (
        <div className={'flex justify-between items-center self-stretch'}>
            <div className={'flex items-start gap-0.75'}>
                {
                    PAYMENTS_FILTER.map((item) => (
                        <Chip key={item.value}
                              listData={item}
                              selected={filter === item.value}
                              onClick={(value) => updateQueryString(value, sort)}/>))
                }
            </div>
            <div className={'w-[200px] h-[48px]'}>
                <Dropdown listData={PAYMENTS_SORT}
                          select={PAYMENTS_SORT.find(item => item.value === sort) ?? PAYMENTS_SORT[0]}
                          setSelect={(value) => updateQueryString(filter, value?.value)}/>
            </div>
        </div>
    );
};

export default MyPageBidCommonTop;