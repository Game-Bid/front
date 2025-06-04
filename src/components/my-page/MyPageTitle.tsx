'use client'
import {usePathname} from "next/navigation";

const MY_PAGE_ROUTES: { [key: string]: string } = {
    '/my-page': '마이페이지',
    '/my-page/edit': '마이페이지 > 회원정보 수정',
    '/my-page/payments': '결제대기',
    '/my-page/bid-history': '입찰내역',
    '/my-page/purchase-history': '낙찰내역',
    '/my-page/my-bid': '내 경매글',
}

const MyPageTitle = () => {
    const path = usePathname();
    const segments = path.split('/').filter(Boolean);
    const pathName = '/' + segments.slice(0, 2).join('/');

    return (
        <div className={'text-2 font-semibold text-fgGrayDefault'}>
            {MY_PAGE_ROUTES[pathName]}
        </div>
    );
};

export default MyPageTitle;