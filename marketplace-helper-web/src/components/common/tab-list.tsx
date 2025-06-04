import Tab from '@/components/ui/tab';

import type { WildberriesTab } from '@/constants';
import type { ITab } from '@/interfaces';

interface TabListProps {
  activeTab: WildberriesTab;
  tabs: ITab[];
  handleTabChange: (tab: WildberriesTab) => void;
}

const TabList = ({ activeTab, tabs, handleTabChange }: TabListProps) => {
  return (
    <ul className="grid gap-3 grid-flow-col">
      {tabs.map(({ label, tab }) => {
        const isTabActive = activeTab === tab;

        return (
          <li key={tab}>
            <Tab
              isTabActive={isTabActive}
              label={label}
              handleTabChange={() => handleTabChange(tab)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;
