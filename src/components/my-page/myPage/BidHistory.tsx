'use client';

import React, {useState} from 'react';
import Chip from "@/components/common/Chip";
import BidHistoryCount from "@/components/my-page/myPage/BidHistoryCount";
import VerticalDivider from "@/components/common/VerticalDivider";

interface DealStatusProps {
    bidCount: number;
    successBidCount: number;
    postCount: number;
    dealCount: number;
}

const bidHistoryList = [
    {label: "모두", value: "all"},
    {label: "아이템", value: "item"},
    {label: "계정", value: "account"},
]

const BidHistory = ({bidCount, successBidCount, postCount, dealCount}: DealStatusProps) => {
    const [currentMod, setCurrentMode] = useState('all');
    return (
        <>
            <div className={'flex gap-0.5 items-start pb-l-0.5'}>
                {bidHistoryList.map((item) => (
                    <Chip key={item.value} listData={item} selected={currentMod === item.value}
                          onClick={(value) => setCurrentMode(value)}/>))}
            </div>
            <div className={'flex w-[793px] h-[133px] p-l-2 justify-between items-center rounded-lg bg-bgGrayDepth2'}>
                <BidHistoryCount count={bidCount} label={'입찰 내역'}/>
                <VerticalDivider/>
                <BidHistoryCount count={successBidCount} label={'낙찰 내역'}/>
                <VerticalDivider/>
                <BidHistoryCount count={postCount} label={'내 경매글'}/>
                <VerticalDivider/>
                <BidHistoryCount count={dealCount} label={'거래 내역'}/>
            </div>
        </>
    );
};

export default BidHistory;