import Divider from "@/components/my-page/sideMenu/Divider";
import MyPageSideMenuItem from "@/components/my-page/sideMenu/MyPageSideMenuItem";
import LogoutButton from "@/components/my-page/sideMenu/LogoutButton";

const MyPageSideMenu = () => {

    return (
        <div className={'md:w-[285px] w-[200px] h-[864px] bg-bgGrayDepth2 rounded-md py-1.5 px-1 mx-1.5'}>
            <ul className={'flex flex-col gap-[8px]'}>
                <MyPageSideMenuItem name={'마이페이지'}
                                    path={null}
                                    icon={'GNB3'}/>
                <Divider/>
                <MyPageSideMenuItem name={'결제'}
                                    path={'payments'}
                                    icon={'STAR-02'}/>
                <MyPageSideMenuItem name={'입찰 내역'}
                                    path={'bid-history'}
                                    icon={'TARGET-02'}/>
                <Divider/>
                <MyPageSideMenuItem name={'구매 내역'}
                                    path={'purchase-history'}
                                    icon={'SERVER-02'}/>
                <MyPageSideMenuItem name={'판매 내역'}
                                    path={'sales-history'}
                                    icon={'TICKET-02'}/>
                <Divider/>
                <MyPageSideMenuItem name={'좋아요'}
                                    path={'likes'}
                                    icon={'HEART'}/>
                <MyPageSideMenuItem name={'메시지'}
                                    path={'messages'}
                                    icon={'MESSAGE-TEXT-01'}/>
                <Divider/>
                <MyPageSideMenuItem name={'알림 설정'}
                                    path={'notification-settings'}
                                    icon={'BELL-01'}/>
                <MyPageSideMenuItem name={'패널티'}
                                    path={'penalty'}
                                    icon={'ALERT-TRIANGLE'}/>
                <Divider/>
                <li>
                    <LogoutButton/>
                </li>
            </ul>
        </div>
    );
};

export default MyPageSideMenu;