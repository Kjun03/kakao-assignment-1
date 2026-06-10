export default function FilterTabs({ currentFilter, onFilterChange }) {
  const tabs = [
    { id: "all", label: "전체" },
    { id: "active", label: "진행중" },
    { id: "completed", label: "완료" },
  ];

  return (
    <div className="flex gap-2 mb-5 pb-4 border-b border-[#edf2f7]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`px-4 py-2 text-sm font-semibold cursor-pointer rounded-lg transition-all duration-200 ${
            currentFilter === tab.id
              ? "bg-[#672be0] text-white"
              : "text-[#64748b] hover:text-[#672be0] hover:bg-[#f8fafc]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}