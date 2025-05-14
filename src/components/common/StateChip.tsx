import CustomIcon from "@/Icons";
import {cn} from "@/_utils/clsx";

interface StateChipProps {
    succeed: boolean;
    label: string;
}

const StateChip = ({succeed, label}: StateChipProps) => {

    console.log(cn('font-medium', succeed ? 'text-systemSuccess' : 'text-systemFailed', 'text-0.75'))
    return (
        <div
            className={'flex h-[32px] p-0.5 justify-center items-center gap-0.25 rounded-max bg-fillGrayDefault leading-[1.4]'}>
            <CustomIcon className={'w-[18px] h-[18px]'} icon={succeed ? 'CHECK-CONTAINED' : 'X-ICON-CONTAINED'}
                        fill={succeed ? '#00DF80' : '#E22933'}/>
            <div className={['font-medium text-0.75', (succeed ? 'text-systemSuccess' : 'text-systemFailed')].join(' ')}>
                {label}
            </div>
        </div>
    );
};

export default StateChip;