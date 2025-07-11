import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Modal from "@/components/ui/Modal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({ isOpen: false, category: null });
  const [formData, setFormData] = useState({ name: "", slug: "" });

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockCategories = [
        { id: 1, name: "Technology", slug: "technology", count: 15 },
        { id: 2, name: "Design", slug: "design", count: 8 },
        { id: 3, name: "Programming", slug: "programming", count: 12 },
        { id: 4, name: "Tutorial", slug: "tutorial", count: 6 },
        { id: 5, name: "Web Development", slug: "web-development", count: 10 }
      ];
      
      setCategories(mockCategories);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = () => {
    setFormData({ name: "", slug: "" });
    setModal({ isOpen: true, category: null });
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, slug: category.slug });
    setModal({ isOpen: true, category });
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        toast.success("Category deleted successfully");
      } catch (err) {
        toast.error("Failed to delete category");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (modal.category) {
        // Update existing category
        setCategories(prev => 
          prev.map(cat => 
            cat.id === modal.category.id 
              ? { ...cat, name: formData.name, slug: formData.slug }
              : cat
          )
        );
        toast.success("Category updated successfully");
      } else {
        // Add new category
        const newCategory = {
          id: Date.now(),
          name: formData.name,
          slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
          count: 0
        };
        setCategories(prev => [...prev, newCategory]);
        toast.success("Category created successfully");
      }
      
      setModal({ isOpen: false, category: null });
      setFormData({ name: "", slug: "" });
    } catch (err) {
      toast.error(modal.category ? "Failed to update category" : "Failed to create category");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const closeModal = () => {
    setModal({ isOpen: false, category: null });
    setFormData({ name: "", slug: "" });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCategories} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Organize your blog posts with categories</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <ApperIcon name="Plus" size={16} />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <Empty
          title="No categories found"
          description="Create your first category to organize your blog posts."
          action={handleAdd}
          actionLabel="Create Category"
          icon="Tag"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="p-6 hover-lift">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <ApperIcon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ApperIcon name="FileText" size={14} />
                  <span>{category.count} posts</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.category ? "Edit Category" : "Add New Category"}
        footer={
          <>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="category-form">
              {modal.category ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
          />
          
          <FormField
            label="Slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="category-slug (optional)"
          />
          
          <div className="text-sm text-gray-500">
            The slug is used in URLs. If left empty, it will be generated from the name.
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;