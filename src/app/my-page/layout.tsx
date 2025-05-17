import React from 'react';
import MyPageSideMenu from "@/components/my-page/sideMenu/MyPageSideMenu";
import MyPageBanner from "@/components/my-page/MyPageBanner";

const MyPageLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main>
            <MyPageBanner/>
            <div className={'w-full max-w-[1200px] pb-20 flex items-start gap-[122px] m-auto'}>
                <MyPageSideMenu/>
                {children}
            </div>

        </main>
    );
};

export default MyPageLayout;