import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const BlogCard = ({ blog, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="p-6 hover-lift">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
          <Badge variant={blog.status === "published" ? "published" : "draft"}>
            {blog.status}
          </Badge>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateText(blog.excerpt)}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ApperIcon name="Calendar" size={14} />
            {formatDate(blog.createdAt)}
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="User" size={14} />
            Content Manager
          </div>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(blog)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Eye" size={14} />
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(blog)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Edit" size={14} />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(blog)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" size={14} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;