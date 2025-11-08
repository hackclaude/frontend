interface CategoryTab {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  tabs: CategoryTab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
}

export default function CategoryTabs({ tabs, activeTab, onTabClick }: CategoryTabsProps) {
  return (
    <div className="sticky top-14 z-10 bg-(--bg-color) border-b border-gray-200">
      <div className="flex gap-2 px-4 py-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabClick(tab.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
