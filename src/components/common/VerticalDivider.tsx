import React from 'react';
import {cn} from "@/_utils/clsx";
import CustomIcon from "@/Icons/Icon";

interface VerticalDividerProps {
    className?: string;
}

const VerticalDivider = ({className}: VerticalDividerProps) => {
    return (
        <CustomIcon icon={'DIVIDER'} className={cn(className, 'w-[1px] stroke-[1px] stroke-borderDivider')}/>
    );
};

export default VerticalDivider;