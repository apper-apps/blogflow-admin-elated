import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import TagInput from "@/components/molecules/TagInput";
import MarkdownEditor from "@/components/molecules/MarkdownEditor";

const BlogForm = ({ blog, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    tags: blog?.tags || [],
    status: blog?.status || "draft"
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error("Failed to save blog post");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleTagsChange = (tags) => {
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({
      ...prev,
      status: "draft"
    }));
    handleSubmit({ preventDefault: () => {} });
  };

  const handlePublish = () => {
    setFormData(prev => ({
      ...prev,
      status: "published"
    }));
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title..."
            required
            error={errors.title}
          />

          <FormField
            label="Excerpt"
            name="excerpt"
            type="textarea"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief description of the blog post..."
            rows={3}
            required
            error={errors.excerpt}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Content *
            </label>
            <MarkdownEditor
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content using Markdown..."
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Tags
                </label>
                <TagInput
                  tags={formData.tags}
                  onTagsChange={handleTagsChange}
                  placeholder="Add tags..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-4">Publishing</h3>
            <div className="space-y-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="w-full"
              >
                <ApperIcon name="Save" size={16} />
                Save as Draft
              </Button>
              <Button
                type="button"
                onClick={handlePublish}
                disabled={isLoading}
                className="w-full"
              >
                <ApperIcon name="Send" size={16} />
                Publish Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          <ApperIcon name="ArrowLeft" size={16} />
          Cancel
        </Button>
        
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <ApperIcon name="Save" size={16} />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;