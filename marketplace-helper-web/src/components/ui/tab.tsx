import { Button } from './button';

interface TabProps {
  isTabActive: boolean;
  label: string;
  handleTabChange: () => void;
}

const Tab = ({ isTabActive, label, handleTabChange }: TabProps) => {
  return (
    <Button variant={isTabActive ? 'default' : 'outline'} onClick={handleTabChange}>
      {label}
    </Button>
  );
};

export default Tab;
