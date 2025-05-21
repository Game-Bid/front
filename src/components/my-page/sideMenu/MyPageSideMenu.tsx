'use client'
import MyPageSideMenuItem from "@/components/my-page/sideMenu/MyPageSideMenuItem";
import LogoutButton from "@/components/my-page/sideMenu/LogoutButton";
import ReactiveDivider from "@/components/common/ReactiveDivider";
import useDeviceSize from "@/hooks/responsive/useDeviceSize";
import {useEffect, useRef, useState} from "react";
import CustomIcon from "@/Icons";

const MyPageSideMenu = () => {
    const {isMobile, isTablet} = useDeviceSize();
    const leftEl = useRef<HTMLDivElement>(null);
    const rightEl = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if ((!isMobile && !isTablet) || !leftEl.current || !rightEl.current) {
            return;
        }


        const leftObserver = new IntersectionObserver((entries) => {
            setShowLeft(!entries[0].isIntersecting);
        }, {
            threshold: 0.1
        });

        leftObserver.observe(leftEl.current);

        const rightObserver = new IntersectionObserver((entries) => {
            setShowRight(!entries[0].isIntersecting);
        }, {
            threshold: 0.1
        })

        rightObserver.observe(rightEl.current);

        return () => {
            leftObserver.disconnect();
            rightObserver.disconnect();
        }
    }, [leftEl.current, rightEl.current]);

    const scrollNav = (dir: number) => {
        if (sidebarRef.current) {
            sidebarRef.current.scrollBy({left: dir * 500, behavior: 'smooth'});
        }
    }

    return (
        <div className={'pt-l-2 lg:pt-l-4'}>
            <div
                className={'flex items-center lg:w-[285px] rounded-md bg-bgGrayDepth2 leading-[1.4] overflow-hidden p-0.875 lg:py-1.5 lg:px-1 relative'}>
                {showLeft && <div
                    className="lg:hidden w-[48px] flex justify-center items-center h-full left-0 top-0 absolute bg-gradient-to-l from-zinc-900/0 to-zinc-900 overflow-hidden">
                    <button onClick={() => scrollNav(-1)}>
                        <CustomIcon icon={'ARROW_LEFT_CONTAINED'} className={'w-[18px] h-[18px]'}/>
                    </button>
                </div>}
                <div ref={sidebarRef} className={'overflow-x-scroll [&::-webkit-scrollbar]:hidden w-dvw'}>
                    <div
                        className={'lg:h-[864px] w-full flex lg:flex-col items-center lg:items-start flex-1 gap-l-0.5'}>
                        <div className={'w-full'} ref={leftEl}>
                            <MyPageSideMenuItem name={'마이페이지'}
                                                path={null}
                                                icon={'GNB3'}/>
                        </div>
                        <ReactiveDivider verticalClassName={'h-[48px]'} horizontalClassName={'w-full'}/>
                        <MyPageSideMenuItem name={'결제 대기'}
                                            path={'payments'}
                                            icon={'STAR-02'}/>
                        <MyPageSideMenuItem name={'입찰 내역'}
                                            path={'bid-history'}
                                            icon={'TARGET-02'}/>
                        {/*<ReactiveDivider/>*/}
                        <MyPageSideMenuItem name={'낙찰 내역'}
                                            path={'purchase-history'}
                                            icon={'SERVER-02'}/>
                        <MyPageSideMenuItem name={'내 경매글'}
                                            path={'sales-history'}
                                            icon={'TICKET-02'}/>
                        <ReactiveDivider verticalClassName={'h-[48px]'} horizontalClassName={'w-full'}/>
                        {/*<MyPageSideMenuItem name={'좋아요'}*/}
                        {/*                    path={'likes'}*/}
                        {/*                    icon={'HEART'}/>*/}
                        <MyPageSideMenuItem name={'메시지'}
                                            path={'messages'}
                                            icon={'MESSAGE-TEXT-01'}/>
                        <ReactiveDivider verticalClassName={'h-[48px]'} horizontalClassName={'w-full'}/>
                        {/*<MyPageSideMenuItem name={'알림 설정'}*/}
                        {/*                    path={'notification-settings'}*/}
                        {/*                    icon={'BELL-01'}/>*/}
                        {/*<MyPageSideMenuItem name={'패널티'}*/}
                        {/*                    path={'penalty'}*/}
                        {/*                    icon={'ALERT-TRIANGLE'}/>*/}
                        {/*<ReactiveDivider/>*/}
                        <div className={'w-full'} ref={rightEl}>
                            <LogoutButton/>
                        </div>
                    </div>
                </div>
                {showRight && <div
                    className="lg:hidden w-[48px] flex justify-center items-center h-full right-0 top-0 absolute bg-gradient-to-r from-zinc-900/0 to-zinc-900 overflow-hidden">
                    <button onClick={() => scrollNav(1)}>
                        <CustomIcon icon={'ARROW_RIGHT_CONTAINED'} className={'w-[18px] h-[18px]'}/>
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default MyPageSideMenu;