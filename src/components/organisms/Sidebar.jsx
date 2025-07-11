import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Sidebar = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("blogs");

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: "LayoutDashboard",
      section: "dashboard"
    },
    {
      name: "All Blogs",
      href: "/blogs",
      icon: "FileText",
      section: "blogs"
    },
    {
      name: "New Post",
      href: "/blogs/new",
      icon: "Plus",
      section: "new"
    },
    {
      name: "Categories",
      href: "/categories",
      icon: "Tag",
      section: "categories"
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: "BarChart3",
      section: "analytics"
    },
    {
      name: "Settings",
      href: "/settings",
      icon: "Settings",
      section: "settings"
    }
  ];

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="PenTool" className="text-white" size={18} />
          </div>
          <h2 className="text-lg font-semibold gradient-text">BlogFlow Admin</h2>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <ApperIcon name={item.icon} size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="text-white" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Content Manager</p>
              <p className="text-xs text-gray-500">admin@blogflow.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <ApperIcon name="PenTool" className="text-white" size={18} />
                  </div>
                  <h2 className="text-lg font-semibold gradient-text">BlogFlow Admin</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <ApperIcon name="X" size={16} />
                </Button>
              </div>
              
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <ApperIcon name={item.icon} size={18} />
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Content Manager</p>
                    <p className="text-xs text-gray-500">admin@blogflow.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;