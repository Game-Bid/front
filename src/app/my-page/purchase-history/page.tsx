import React, {Suspense} from 'react';
import MyPageBidCommonTop from "@/components/my-page/MyPageBidCommonTop";

const MyPagePurchaseHistory = () => {
    return (
        <div className={'w-[793px] flex flex-col gap-l-2 flex-start self-stretch font-semibold text-fgGrayDefault'}>
            <Suspense>
                <MyPageBidCommonTop/>
            </Suspense>
        </div>
    );
};

export default MyPagePurchaseHistory;