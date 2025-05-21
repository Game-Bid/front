import React from 'react';
import Image from "next/image";
import CustomIcon from "@/Icons/Icon";

const MyPageBanner = () => {
    return (
        <div className={'relative flex h-[240px] justify-center items-center self-stretch bg-[#080621]'}>
            <div className={'w-[768px] h-[297px] rounded-[768px]'}
                 style={{
                     borderRadius: '768px',
                     background: 'radial-gradient(50% 50% at 50% 50%, rgba(88, 101, 242, 0.60) 0%, rgba(88, 101, 242, 0.00) 100%)',
                     filter: 'blur(146.10000610351562px)'
                 }}/>
            <Image src={'/myPage/mypage_banner.png'} alt={'banner'} width={253.767} height={272.018}
                   className={'absolute mt-[20px]'}/>
            <CustomIcon icon={'EDIT-02'}
                        className={'absolute right-[120px] top-[20px] flex w-[36px] h-[36px] p-[10px] justify-center items-center gap-[10px] rounded-[20px] bg-fillGrayDefault'}/>
        </div>
    );
};

export default MyPageBanner;