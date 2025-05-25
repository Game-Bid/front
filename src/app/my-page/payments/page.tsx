import React, {Suspense} from "react";
import MyPagePaymentsTop from "@/components/my-page/payments/MyPagePaymentsTop";


const MyPagePaymentPage = () => {

    return <div className={'w-[793px] flex flex-col gap-l-2 flex-start self-stretch font-semibold text-fgGrayDefault'}>
        <Suspense>
            <MyPagePaymentsTop/>
        </Suspense>
    </div>;
};

export default MyPagePaymentPage;

