import BidHistoryTop from "@/components/my-page/bidHistory/bidHistoryTop";
import {Suspense} from "react";

const Page = () => {
    return (
        <div className={'w-[793px] flex flex-col gap-l-2 flex-start self-stretch font-semibold text-fgGrayDefault'}>
            <Suspense>
                <BidHistoryTop/>
            </Suspense>
        </div>
    );
};

export default Page;