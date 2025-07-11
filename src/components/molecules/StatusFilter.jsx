import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const StatusFilter = ({ onFilter, currentFilter = "all" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    { value: "all", label: "All Posts", icon: "List" },
    { value: "published", label: "Published", icon: "CheckCircle" },
    { value: "draft", label: "Draft", icon: "Edit" }
  ];

  const activeFilter = filters.find(f => f.value === currentFilter);

  const handleFilterSelect = (filterValue) => {
    onFilter(filterValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <ApperIcon name={activeFilter.icon} size={16} />
        {activeFilter.label}
        <ApperIcon name="ChevronDown" size={16} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="py-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleFilterSelect(filter.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                  currentFilter === filter.value ? "bg-primary-50 text-primary-600" : "text-gray-700"
                }`}
              >
                <ApperIcon name={filter.icon} size={16} />
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;