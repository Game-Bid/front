const PaymentWaitingItem = () => {
    return (
        <div className="self-stretch inline-flex flex-col justify-center items-start gap-2">
            <div data-size="Big" data-state="Default" data-type="Item" data-종료="false"
                 className="self-stretch p-5 bg-Fill-Gray-Default rounded-[20px] flex flex-col justify-start items-start gap-3">
                <div className="self-stretch inline-flex justify-between items-center">
                    <div
                        className="h-7 px-2 bg-Fill-Gray-Default rounded-[100px] shadow-[0px_0px_20px_0px_rgba(255,103,103,0.40)] flex justify-center items-center gap-1">
                        <div className="w-4 h-4 relative">
                            <div className="w-3.5 h-4 left-[2.01px] top-[1.05px] absolute bg-Color-Type-Item"/>
                        </div>
                        <div
                            className="justify-start text-Color-Type-Item text-xs font-medium font-['Pretendard'] leading-none">아이템
                        </div>
                    </div>
                    <div className="flex-1 self-stretch relative"/>
                </div>
                <div
                    className="justify-start text-Fg-Gray-Default text-sm font-normal font-['Pretendard'] leading-tight">메이플스토리 {'>'} 스카니아
                </div>
                <div
                    className="self-stretch h-12 justify-start text-Fg-Gray-Default text-lg font-semibold font-['Pretendard'] leading-relaxed">공59
                    럭6 레드 크리븐 팝니다
                </div>
                <div
                    className="justify-start text-Fg-Primary-Accent text-lg font-semibold font-['Pretendard'] leading-relaxed">185,000원
                </div>
                <div className="inline-flex justify-start items-center gap-1">
                    <div className="w-6 h-6 relative">
                        <div className="w-5 h-5 left-[2.50px] top-[2px] absolute bg-Fg-Gray-Default"/>
                    </div>
                    <div
                        className="justify-start text-Fg-Gray-Default text-sm font-normal font-['Pretendard'] leading-tight">2025.04.27
                        종료
                    </div>
                </div>
                <div className="self-stretch h-px border border-Border-Gray-Default"/>
                <div className="self-stretch py-2 inline-flex justify-between items-center">
                    <div className="flex-1 flex justify-start items-center gap-1">
                        <div data-size="Small" data-state="Default"
                             className="w-8 h-8 bg-blend-multiply bg-white/20 rounded-[50px] flex justify-between items-center">
                            <div
                                className="justify-center text-Fg-Gray-Default text-sm font-semibold font-['Pretendard'] leading-tight">G
                            </div>
                        </div>
                        <div
                            className="flex-1 justify-start text-Fg-Gray-Default text-sm font-normal font-['Pretendard'] leading-tight">NickName
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <div className="flex justify-start items-center gap-1">
                            <div className="w-6 h-6 relative">
                                <div className="w-5 h-4 left-[1.35px] top-[4.14px] absolute bg-Fg-Gray-Default"/>
                            </div>
                            <div
                                className="justify-start text-Fg-Gray-Default text-sm font-normal font-['Pretendard'] leading-tight">884
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-icon="Text Only" data-size="Big" data-state="Default"
                 className="self-stretch h-12 px-3 bg-Fill-Primary-Default rounded-xl shadow-[0px_2px_100px_0px_rgba(88,101,242,0.40)] inline-flex justify-center items-center gap-1">
                <div
                    className="justify-start text-Fg-Primary-Default text-base font-semibold font-['Pretendard'] leading-snug">결제하기
                </div>
            </div>
            <div className="self-stretch px-2 inline-flex justify-start items-start gap-2">
                <div
                    className="justify-start text-Fg-Gray-Default text-base font-normal font-['Pretendard'] leading-snug">결제
                    마감까지
                </div>
                <div
                    className="justify-start text-Color-System-Failed text-base font-normal font-['Pretendard'] leading-snug">09:59
                </div>
            </div>
        </div>
    );
};

export default PaymentWaitingItem;