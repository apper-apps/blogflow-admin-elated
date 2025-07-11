import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import blogService from "@/services/api/blogService";

const BlogView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBlog = async () => {
    try {
      setLoading(true);
      setError("");
      const blogData = await blogService.getById(id);
      setBlog(blogData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [id]);

  const handleEdit = () => {
    navigate(`/blogs/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.delete(id);
        toast.success("Blog deleted successfully");
        navigate("/blogs");
      } catch (err) {
        toast.error("Failed to delete blog");
      }
    }
  };

  const renderMarkdown = (content) => {
    let html = content
      .replace(/^### (.*$)/gm, "<h3 class='text-lg font-semibold text-gray-900 mt-6 mb-3'>$1</h3>")
      .replace(/^## (.*$)/gm, "<h2 class='text-xl font-semibold text-gray-900 mt-8 mb-4'>$1</h2>")
      .replace(/^# (.*$)/gm, "<h1 class='text-2xl font-bold text-gray-900 mt-8 mb-4'>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>")
      .replace(/`(.*?)`/g, "<code class='bg-gray-100 px-2 py-1 rounded text-sm font-mono'>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:text-primary-800 underline">$1</a>')
      .replace(/^- (.*$)/gm, "<li class='mb-1'>$1</li>")
      .replace(/^> (.*$)/gm, "<blockquote class='border-l-4 border-primary-500 pl-4 italic text-gray-600 my-4'>$1</blockquote>")
      .replace(/```([\s\S]*?)```/g, "<pre class='bg-gray-100 p-4 rounded-lg overflow-x-auto my-4'><code class='text-sm font-mono'>$1</code></pre>")
      .replace(/\n\n/g, "</p><p class='mb-4'>")
      .replace(/\n/g, "<br>");

    if (html.includes("<li>")) {
      html = html.replace(/(<li>.*?<\/li>)/gs, "<ul class='list-disc list-inside space-y-1 mb-4'>$1</ul>");
    }

    if (!html.startsWith("<h") && !html.startsWith("<ul") && !html.startsWith("<blockquote") && !html.startsWith("<pre")) {
      html = "<p class='mb-4'>" + html + "</p>";
    }

    return { __html: html };
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBlog} />;
  if (!blog) return <Error message="Blog not found" />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Back to Blogs
        </Button>
        <div className="flex items-center gap-3 ml-auto">
          <Button
            variant="secondary"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Edit" size={16} />
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Trash2" size={16} />
            Delete
          </Button>
        </div>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant={blog.status === "published" ? "published" : "draft"}>
                {blog.status}
              </Badge>
              <span className="text-sm text-gray-500">
                {format(new Date(blog.createdAt), "MMMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {blog.excerpt}
            </p>
            
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          <div className="prose prose-gray max-w-none">
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={renderMarkdown(blog.content)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Post Details</h3>
            <p className="text-sm text-gray-500">Information about this blog post</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-gray-500">
              Created: {format(new Date(blog.createdAt), "MMM d, yyyy")}
            </p>
            <p className="text-sm text-gray-500">
              Updated: {format(new Date(blog.updatedAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogView;