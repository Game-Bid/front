import React from 'react';
import {cn} from "@/_utils/clsx";
import Icon from "@/Icons/Icon";

interface VerticalDividerProps {
    className?: string;
}

const VerticalDivider = ({className}: VerticalDividerProps) => {
    return (
       <Icon icon={'DIVIDER'} className={cn(className, 'w-[1px] h-[64px] stroke-[1px] stroke-borderDivider')}/>
    );
};

export default VerticalDivider;