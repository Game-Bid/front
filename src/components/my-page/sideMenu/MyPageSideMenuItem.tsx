'use client'

import Icon, {IconList} from "@/Icons";
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";
import Badge from "@/components/common/Badge";

interface MyPageSideMenuItemProps {
    name: string;
    path: string | null;
    icon: IconList;
    count?: number;
}

const MyPageSideMenuItem = ({name, path, icon, count = 0}: MyPageSideMenuItemProps) => {
    const segment = useSelectedLayoutSegment()
    const BACKGROUND_STYLE = `flex h-[48px] p-0.75 items-center gap-l-0.5 self-stretch rounded-md hover:bg-fillGrayHovered hover:font-bold ${segment === path && 'bg-fillGrayFocused font-bold'}`;

    return (
        <Link href={path ? `/my-page/${path}` : '/my-page'} className={BACKGROUND_STYLE}>
            <Icon icon={icon} className={'w-[24px] h-[24px]'}/>
            <span className={'break-keep whitespace-nowrap flex-1'}>{name}</span>
            {count > 0 && <Badge count={count}></Badge>}
        </Link>
    );
};

export default MyPageSideMenuItem;