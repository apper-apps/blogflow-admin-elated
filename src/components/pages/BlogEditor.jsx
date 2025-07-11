import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import BlogForm from "@/components/organisms/BlogForm";
import blogService from "@/services/api/blogService";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadBlog = async () => {
    if (!isEditing) return;
    
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

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      
      if (isEditing) {
        await blogService.update(id, formData);
        toast.success("Blog updated successfully");
      } else {
        await blogService.create(formData);
        toast.success("Blog created successfully");
      }
      
      navigate("/blogs");
    } catch (err) {
      toast.error(isEditing ? "Failed to update blog" : "Failed to create blog");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/blogs");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBlog} />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2"
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Back to Blogs
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? "Update your blog post content and settings" : "Write and publish your new blog post"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <BlogForm
          blog={blog}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={submitting}
        />
      </div>
    </div>
  );
};

export default BlogEditor;