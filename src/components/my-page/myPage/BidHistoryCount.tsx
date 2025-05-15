'use client';

interface BidHistoryCountProps {
    count: number;
    label: string
}

const BidHistoryCount = ({count, label}: BidHistoryCountProps) => {
    return (
        <>
            <div className={'flex w-[120px] flex-col justify-center items-center self-stretch'}>
                <div className={'text-fgGrayDefault text-center text-2.25 font-semibold leading-[1.3]'}>{count}</div>
                <div className={'text-[#999] text-center text-1 font-normal leading-[1.4]'}>{label}</div>
            </div>
        </>
    );
};

export default BidHistoryCount;