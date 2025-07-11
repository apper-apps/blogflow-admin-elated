import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onSearch, onMobileMenuToggle }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (searchTerm) => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMobileMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="PenTool" className="text-white" size={18} />
            </div>
            <h1 className="text-xl font-bold gradient-text">BlogFlow Admin</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {onSearch && (
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search blogs..."
              />
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden"
          >
            <ApperIcon name="Search" size={20} />
          </Button>

          <Button
            onClick={() => navigate("/blogs/new")}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span className="hidden sm:inline">New Post</span>
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden px-4 pb-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search blogs..."
          />
        </div>
      )}
    </header>
  );
};

export default Header;