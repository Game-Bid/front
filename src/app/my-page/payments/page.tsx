import React, {Suspense} from "react";
import MyPagePaymentsTop from "@/components/my-page/payments/MyPagePaymentsTop";
import PaymentWaitingItem from "@/components/my-page/payments/PaymentWaitingItem";


const MyPagePaymentPage = () => {
    const data = [1];

    return <div className={'w-[793px] flex flex-col gap-l-2 flex-start self-stretch font-semibold text-fgGrayDefault'}>
        <Suspense>
            <MyPagePaymentsTop/>
        </Suspense>
        {data.length <= 0 ?
            <div
                className={'flex h-[256px] justify-center items-center self-stretch font-normal text-0.875 leading-[1.4] rounded-lg bg-bgGrayDepth2'}>
                결제 대기중인 경매가 없습니다
            </div>
            : <div>
                <PaymentWaitingItem/>
            </div>}

    </div>;
};

export default MyPagePaymentPage;

