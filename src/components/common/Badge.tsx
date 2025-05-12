import React from 'react';

interface BadgeProps {
    count: number
}

const Badge = ({count}: BadgeProps) => {
    return (
        <span
            className={'flex my-[15px] py-[0.5px] px-[5.5px] justify-center items-center gap-[10px] rounded-[12px] text-0.75 font-medium bg-fillPrimaryDefault'}>
            {count >= 100 ? '99+' : count}
        </span>
    );
};

export default Badge;