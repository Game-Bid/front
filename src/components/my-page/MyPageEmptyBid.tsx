interface MyPageEmptyBidProps {
    label: string
}
const MyPageEmptyBid = ({label}: MyPageEmptyBidProps) => {
    return (
        <div
            className={'w-full flex h-[256px] justify-center items-center self-stretch font-normal text-0.875 leading-[1.4] rounded-lg bg-bgGrayDepth2'}>
            {label}
        </div>
    );
};

export default MyPageEmptyBid;