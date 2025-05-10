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
    const BACKGROUND_STYLE = `flex  px-0.75 h-[48px] rounded-sm hover:bg-fillGrayHovered hover:font-bold ${segment === path && 'bg-fillGrayFocused font-bold'}`;

    return (
        <li>
            <Link href={path ? `/my-page/${path}` : '/my-page'} className={BACKGROUND_STYLE}>
                <div className={'flex flex-1 items-center gap-0.5'}>
                    <Icon icon={icon} className={'w-[24px] h-[24px]'}/>
                    <span>{name}</span>
                </div>
                { count > 0 && <Badge count={count}></Badge>}
            </Link>
        </li>
    );
};

export default MyPageSideMenuItem;