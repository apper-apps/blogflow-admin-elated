import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  title = "No content found", 
  description = "Get started by creating your first item.",
  action,
  actionLabel = "Create New",
  icon = "FileText" 
}) => {
  return (
    <Card className="p-12 text-center">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full mb-6">
          <ApperIcon name={icon} className="text-primary-600" size={36} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          {description}
        </p>
      </div>
      
      {action && (
        <Button onClick={action} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default Empty;