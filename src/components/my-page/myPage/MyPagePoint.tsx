import React from 'react';
import {formatNumberWithCommas} from "@/_utils/NumberUtils";
import Button from "@/components/common/Button";

interface MyPagePointProps {
    point: number
}
const BUTTON_STYLE = 'w-[120px] h-[48px]';
const MyPagePoint = ({point}: MyPagePointProps) => {

    return (
        <div className={'flex p-l-2 justify-between items-center self-stretch bg-bgGrayDepth2 rounded-lg'}>
            <div className={'font-semibold text-2.25 leading-[1.3] text-fgPrimaryAccent'}>{formatNumberWithCommas(point)} P</div>
            <div className={'flex gap-0.75'}>
                <Button variant={'secondary'} title={'내역 보기'} className={BUTTON_STYLE}/>
                <Button variant={'secondary'} title={'출금하기'} className={BUTTON_STYLE}/>
            </div>
        </div>
    );
};

export default MyPagePoint;