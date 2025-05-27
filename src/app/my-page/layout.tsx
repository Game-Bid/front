import React from 'react';
import MyPageSideMenu from "@/components/my-page/sideMenu/MyPageSideMenu";
import MyPageBanner from "@/components/my-page/MyPageBanner";
import MyPageTitle from "@/components/my-page/MyPageTitle";

const MyPageLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <main className={'w-full max-w-[1200px] pb-20 m-auto px-[20px] lg:px-0'}>
            <MyPageBanner/>
            <div className={'w-full flex flex-col lg:flex-row items-start gap-l lg:gap-[122px]'}>
                <div className={'flex flex-col w-full'}>
                    <h3 className={'lg:hidden pt-l-4'}><MyPageTitle/></h3>
                    <MyPageSideMenu/>
                </div>
                <div className={'flex flex-col gap-l-2 w-full'}>
                    <h3 className={'pt-l-4 hidden lg:block'}><MyPageTitle/></h3>
                    {children}
                </div>
            </div>

        </main>
    );
};

export default MyPageLayout;