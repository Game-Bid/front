import React from 'react';
import MyPageSideMenu from "@/components/my-page/sideMenu/MyPageSideMenu";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={'flex w-[1200px] m-auto pt-4 gap-[122px]'}>
            <MyPageSideMenu/>
            <div className={'flex-1'}>
                {children}
            </div>
        </div>
    );
};

export default MyPageLayout;