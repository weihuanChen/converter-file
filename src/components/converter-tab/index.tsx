import {
  tabActiveClasses,
  tabBaseClasses,
  tabInactiveClasses,
} from "@/app/styles/global";

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  positionInSet: number;
  setSize: number;
  onClick: () => void;
}
const Tab: React.FC<TabProps> = ({
  id,
  label,
  isActive,
  positionInSet,
  setSize,
  onClick,
}) => {
  return (
    <li className="flex-1" role="presentation">
      <button
        type="button"
        className={`${tabBaseClasses} ${
          isActive ? tabActiveClasses : tabInactiveClasses
        }`}
        id={id}
        role="tab"
        aria-selected={isActive}
        aria-setsize={setSize}
        aria-posinset={positionInSet}
        tabIndex={isActive ? 0 : -1}
        onClick={onClick}
      >
        <span>{label}</span>
      </button>
    </li>
  );
};
export default Tab;