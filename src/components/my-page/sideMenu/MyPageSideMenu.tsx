import Divider from "@/components/my-page/sideMenu/Divider";
import MyPageSideMenuItem from "@/components/my-page/sideMenu/MyPageSideMenuItem";
import LogoutButton from "@/components/my-page/sideMenu/LogoutButton";

const MyPageSideMenu = () => {

    return (
        <div className={'flex items-center w-[285px] pt-l-4 leading-[1.4]'}>
            <div className={'h-[864px] flex flex-col  items-start py-1.5 px-1 flex-[1-0-0] rounded-md bg-bgGrayDepth2 gap-0.5'}>
                <MyPageSideMenuItem name={'마이페이지'}
                                    path={null}
                                    icon={'GNB3'}/>
                <Divider/>
                <MyPageSideMenuItem name={'결제 대기'}
                                    path={'payments'}
                                    icon={'STAR-02'}/>
                <MyPageSideMenuItem name={'입찰 내역'}
                                    path={'bid-history'}
                                    icon={'TARGET-02'}/>
                {/*<Divider/>*/}
                <MyPageSideMenuItem name={'낙찰 내역'}
                                    path={'purchase-history'}
                                    icon={'SERVER-02'}/>
                <MyPageSideMenuItem name={'내 경매글'}
                                    path={'sales-history'}
                                    icon={'TICKET-02'}/>
                <Divider/>
                {/*<MyPageSideMenuItem name={'좋아요'}*/}
                {/*                    path={'likes'}*/}
                {/*                    icon={'HEART'}/>*/}
                <MyPageSideMenuItem name={'메시지'}
                                    path={'messages'}
                                    icon={'MESSAGE-TEXT-01'}/>
                <Divider/>
                {/*<MyPageSideMenuItem name={'알림 설정'}*/}
                {/*                    path={'notification-settings'}*/}
                {/*                    icon={'BELL-01'}/>*/}
                {/*<MyPageSideMenuItem name={'패널티'}*/}
                {/*                    path={'penalty'}*/}
                {/*                    icon={'ALERT-TRIANGLE'}/>*/}
                {/*<Divider/>*/}
                <LogoutButton/>
            </div>
        </div>
    );
};

export default MyPageSideMenu;