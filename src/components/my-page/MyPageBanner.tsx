import React from 'react';
import Image from "next/image";

const MyPageBanner = () => {
    return (
        <div className={'relative flex h-[240px] justify-center items-center self-stretch bg-[#080621]'}>
            <div className={'w-[768px] h-[297px] rounded-[768px]'}
                 style={{
                     borderRadius: '768px',
                     background: 'radial-gradient(50% 50% at 50% 50%, rgba(88, 101, 242, 0.60) 0%, rgba(88, 101, 242, 0.00) 100%)',
                     filter: 'blur(146.10000610351562px)'
                 }}/>
            <Image src={'/mypage_banner.png'} alt={'banner'} width={253.767} height={272.018}
                   className={'absolute mt-[20px]'}/>
        </div>
    );
};

export default MyPageBanner;