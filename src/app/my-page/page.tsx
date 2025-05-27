import MyPageProfile from "@/components/my-page/myPage/MyPageProfile";
import MyPagePoint from "@/components/my-page/myPage/MyPagePoint";
import BidHistory from "@/components/my-page/myPage/BidHistory";

const SUB_TITLE_STYLE = 'text-1.25 mb-l-0.5';
const Page = () => {
    const SECTION_STYLE = 'flex flex-col items-start gap-l-0.5 self-stretch';

    return <div className={'w-[793px] flex flex-col flex-start self-stretch font-semibold text-fgGrayDefault'}>
        <div className={'flex flex-col gap-l-4'}>
            <div className={SECTION_STYLE}>
                <p className={SUB_TITLE_STYLE}>프로필</p>
                <MyPageProfile
                    nickname={'tnehddl'}
                    email={'ehdtn18@gmail.com'}
                    profileUrl={null}
                    penaltyCount={0}
                    idCertified={false}
                    accountCertified={true}
                    phoneCertified={true}
                />
            </div>
            <div className={SECTION_STYLE}>
                <p className={SUB_TITLE_STYLE}>포인트</p>
                <MyPagePoint point={240700000}/>
            </div>
            <div className={SECTION_STYLE}>
                <p className={SUB_TITLE_STYLE}>거래 현황</p>
                <BidHistory bidCount={14} successBidCount={2} postCount={3} dealCount={1}/>
            </div>
            {/*<div className={SECTION_STYLE}>*/}
            {/*    <p className={SUB_TITLE_STYLE}>경매 레벨</p>*/}
            {/*</div>*/}
        </div>
    </div>;
};

export default Page;

