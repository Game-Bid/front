'use client'

import React from "react";
import Chip from "@/components/common/Chip";
import {useRouter, useSearchParams} from "next/navigation";
import Dropdown, {DropdownType} from "@/components/common/Dropdown";

const PAYMENTS_MOD = [
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

const PAYMENTS_SORT_TYPES: DropdownType[] = [
    {
        label: '최신순',
        value: 'date_asc'
    }
]

const MyPagePaymentsTop = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mod = searchParams.get('mod') ?? 'all';
    const sort = searchParams.get('sort') ?? 'date_asc';

    const updateQueryString = (targetMod: string = mod, targetSort: string = sort) => {
        router.push(`/my-page/payments?mod=${targetMod}&sort=${targetSort}`);
    }

    return (
        <div className={'flex justify-between items-center self-stretch'}>
            <div className={'flex items-start gap-0.75'}>
                {
                    PAYMENTS_MOD.map((item) => (
                        <Chip key={item.value}
                              listData={item}
                              selected={mod === item.value}
                              onClick={(value) => updateQueryString(value, sort)}/>))
                }
            </div>
            <div className={'w-[200px] h-[48px]'}>
                <Dropdown listData={PAYMENTS_SORT_TYPES}
                          select={PAYMENTS_SORT_TYPES.find(item => item.value === sort) ?? PAYMENTS_SORT_TYPES[0]}
                          setSelect={(value) => updateQueryString(mod, value?.value)}/>
            </div>
        </div>
    );
};

export default MyPagePaymentsTop;