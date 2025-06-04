'use client'

import TabItem from "@/components/common/tab/TabItem";

interface TabProps {
    tabs: {
        label: string;
        value: string;
    }[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Tab = ({tabs, activeTab, onTabChange}: TabProps) => {
    return (
        <div className={'flex items-start gap-[10px] self-stretch'}>
            {tabs.map((tab) => (
                <div key={tab.value} onClick={() => onTabChange(tab.value)}>
                    <TabItem label={tab.label} isActive={tab.value === activeTab}/>
                </div>
            ))}
        </div>
    );
};

export default Tab;