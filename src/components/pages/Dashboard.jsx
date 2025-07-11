import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import StatsCards from "@/components/organisms/StatsCards";
import BlogCard from "@/components/organisms/BlogCard";
import blogService from "@/services/api/blogService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [blogsData, statsData] = await Promise.all([
        blogService.getAll(),
        blogService.getStats()
      ]);
      
      setBlogs(blogsData.slice(0, 6)); // Show only recent 6 blogs
      setStats(statsData);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleEditBlog = (blog) => {
    navigate(`/blogs/${blog.Id}/edit`);
  };

  const handleViewBlog = (blog) => {
    navigate(`/blogs/${blog.Id}`);
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.delete(blog.Id);
        toast.success("Blog deleted successfully");
        loadDashboardData();
      } catch (err) {
        toast.error("Failed to delete blog");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <Button
          onClick={() => navigate("/blogs/new")}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          New Post
        </Button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
              <Button
                variant="secondary"
                onClick={() => navigate("/blogs")}
                className="flex items-center gap-2"
              >
                View All
                <ApperIcon name="ArrowRight" size={16} />
              </Button>
            </div>
            
            {blogs.length === 0 ? (
              <Empty
                title="No blog posts yet"
                description="Start by creating your first blog post to see it here."
                action={() => navigate("/blogs/new")}
                actionLabel="Create First Post"
                icon="FileText"
              />
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.Id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{blog.title}</h3>
                        <p className="text-sm text-gray-500 truncate">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            blog.status === "published" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {blog.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewBlog(blog)}
                        >
                          <ApperIcon name="Eye" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <ApperIcon name="Edit" size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="secondary"
                onClick={() => navigate("/blogs/new")}
                className="w-full justify-start"
              >
                <ApperIcon name="Plus" size={16} />
                Create New Post
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/blogs")}
                className="w-full justify-start"
              >
                <ApperIcon name="List" size={16} />
                View All Posts
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/settings")}
                className="w-full justify-start"
              >
                <ApperIcon name="Settings" size={16} />
                Settings
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ApperIcon name="Lightbulb" size={16} className="text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Use Tags</p>
                  <p className="text-xs text-gray-500">Organize your posts with relevant tags for better discoverability.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="Target" size={16} className="text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Write Compelling Excerpts</p>
                  <p className="text-xs text-gray-500">A good excerpt can make readers want to read more.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="Clock" size={16} className="text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Publish Regularly</p>
                  <p className="text-xs text-gray-500">Consistent posting keeps your audience engaged.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;