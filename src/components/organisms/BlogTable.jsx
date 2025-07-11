import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const BlogTable = ({ blogs, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Updated</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.Id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="space-y-1">
                  <h3 className="font-medium text-gray-900">
                    {truncateText(blog.title, 60)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {truncateText(blog.excerpt, 80)}
                  </p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          +{blog.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge variant={blog.status === "published" ? "published" : "draft"}>
                  {blog.status}
                </Badge>
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">
                {formatDate(blog.createdAt)}
              </td>
              <td className="py-4 px-4 text-sm text-gray-500">
                {formatDate(blog.updatedAt)}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(blog)}
                    className="p-1"
                  >
                    <ApperIcon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(blog)}
                    className="p-1"
                  >
                    <ApperIcon name="Edit" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(blog)}
                    className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <ApperIcon name="Trash2" size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;