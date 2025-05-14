import React from 'react';
import MyPageSideMenu from "@/components/my-page/sideMenu/MyPageSideMenu";
import MyPageBanner from "@/components/my-page/MyPageBanner";

const MyPageLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main>
            <MyPageBanner/>
            <div className={'w-[1200px] m-auto pt-4 flex justify-between'}>
                <MyPageSideMenu/>
                {children}
            </div>

        </main>
    );
};

export default MyPageLayout;