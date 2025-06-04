'use client'

interface TabItemProps {
    label: string;
    isActive: boolean;
}

const TabItem = ({label, isActive}: TabItemProps) => {
    return (
        <div
            className={`flex text-fgGrayEntered font-semibold text-1.125 h-[40px] py-[8px] px-0.75 justify-center items-start gap-0.25 ${isActive ? 'border-b-2 border-fgGrayEntered' : ''}`}>
            {label}
        </div>
    );
};

export default TabItem;