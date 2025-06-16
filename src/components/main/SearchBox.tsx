import React from 'react';
import CustomIcon from "@/Icons";
import Button from '../common/Button';

const SearchBox = () => {
    return (
        <div
            className={'flex flex-col w-full max-w-[640px] pt-[64px] pb-[128px] m-auto self-stretch items-start gap-l-1.25'}>
            <h3 className={'text-fgGrayDefault text-2 font-semibold'}>
                경매 검색
            </h3>
            <div className={'flex items-start gap-[10px] self-stretch h-[64px]'}>
                <div
                    className={'shadow-button-primary-shadow w-full h-[64px] px-[12px] pr-[40px] text-1.125 text-fgGrayDefault placeholder-fgGrayPlaceholder  duration-100 flex items-center gap-0.5 bg-fillGrayDefault rounded-md border border-fgPrimaryAccent'}>
                    <CustomIcon className={'w-[18px] h-[18px]'} stroke={'#EFEFF0'} icon={'SEARCH'}/>
                    <input className={'flex-1 bg-transparent flex items-center'} placeholder={'게임 이름을 입력하세요.'}
                           type="text"/>
                </div>
                <Button className={'h-full p-1.25 gap-0.25 flex justify-center shadow-button-primary-shadow'} title={'검색하기'}/>
            </div>
        </div>
    );
};

export default SearchBox;