import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Modal from "@/components/ui/Modal";
import SearchBar from "@/components/molecules/SearchBar";
import StatusFilter from "@/components/molecules/StatusFilter";
import BlogCard from "@/components/organisms/BlogCard";
import BlogTable from "@/components/organisms/BlogTable";
import blogService from "@/services/api/blogService";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blog: null });

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const blogsData = await blogService.getAll();
      setBlogs(blogsData);
      setFilteredBlogs(blogsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, statusFilter]);

  const filterBlogs = async () => {
    let filtered = [...blogs];

    // Apply search filter
    if (searchTerm) {
      try {
        filtered = await blogService.search(searchTerm);
      } catch (err) {
        console.error("Search error:", err);
      }
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(blog => blog.status === statusFilter);
    }

    setFilteredBlogs(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleEditBlog = (blog) => {
    navigate(`/blogs/${blog.Id}/edit`);
  };

  const handleViewBlog = (blog) => {
    navigate(`/blogs/${blog.Id}`);
  };

  const handleDeleteBlog = (blog) => {
    setDeleteModal({ isOpen: true, blog });
  };

  const confirmDelete = async () => {
    if (!deleteModal.blog) return;

    try {
      await blogService.delete(deleteModal.blog.Id);
      toast.success("Blog deleted successfully");
      setDeleteModal({ isOpen: false, blog: null });
      loadBlogs();
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, blog: null });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadBlogs} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage and organize your blog content</p>
        </div>
        <Button
          onClick={() => navigate("/blogs/new")}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          New Post
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by title, content, or tags..."
          />
          <StatusFilter
            onFilter={handleStatusFilter}
            currentFilter={statusFilter}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <ApperIcon name="Grid3X3" size={16} />
          </Button>
          <Button
            variant={viewMode === "table" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            <ApperIcon name="List" size={16} />
          </Button>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <Empty
          title="No blog posts found"
          description={searchTerm || statusFilter !== "all" 
            ? "Try adjusting your search or filter criteria." 
            : "Start by creating your first blog post."
          }
          action={() => navigate("/blogs/new")}
          actionLabel="Create First Post"
          icon="FileText"
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {viewMode === "grid" ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.Id}
                    blog={blog}
                    onEdit={handleEditBlog}
                    onView={handleViewBlog}
                    onDelete={handleDeleteBlog}
                  />
                ))}
              </div>
            </div>
          ) : (
            <BlogTable
              blogs={filteredBlogs}
              onEdit={handleEditBlog}
              onView={handleViewBlog}
              onDelete={handleDeleteBlog}
            />
          )}
        </div>
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={cancelDelete}
        title="Delete Blog Post"
        footer={
          <>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              <ApperIcon name="Trash2" size={16} />
              Delete
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="text-red-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Are you sure?</h3>
              <p className="text-sm text-gray-500">This action cannot be undone.</p>
            </div>
          </div>
          
          {deleteModal.blog && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {deleteModal.blog.title}
              </p>
              <p className="text-sm text-gray-500">
                {deleteModal.blog.excerpt}
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BlogList;