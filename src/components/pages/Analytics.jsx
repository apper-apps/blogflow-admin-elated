import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockAnalytics = {
        totalViews: 12543,
        totalPosts: 24,
        totalComments: 89,
        averageReadTime: "3.2 min",
        monthlyViews: [
          { month: "Jan", views: 1200 },
          { month: "Feb", views: 1800 },
          { month: "Mar", views: 2400 },
          { month: "Apr", views: 1900 },
          { month: "May", views: 2100 },
          { month: "Jun", views: 2800 }
        ],
        topPosts: [
          { title: "Getting Started with React Hooks", views: 2150 },
          { title: "Advanced CSS Grid Techniques", views: 1890 },
          { title: "Modern JavaScript ES2023 Features", views: 1650 },
          { title: "Performance Optimization for React Apps", views: 1420 },
          { title: "Building RESTful APIs with Node.js", views: 1200 }
        ],
        traffic: {
          organic: 45,
          direct: 30,
          social: 15,
          referral: 10
        }
      };
      
      setAnalytics(mockAnalytics);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadAnalytics} />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your blog performance and engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Eye" className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPosts}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalComments}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="MessageCircle" className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Read Time</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageReadTime}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ApperIcon name="Clock" className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Posts */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Posts</h2>
          <div className="space-y-3">
            {analytics.topPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                  <p className="text-xs text-gray-500">{post.views} views</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {Object.entries(analytics.traffic).map(([source, percentage]) => (
              <div key={source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    source === "organic" ? "bg-green-500" :
                    source === "direct" ? "bg-blue-500" :
                    source === "social" ? "bg-purple-500" :
                    "bg-orange-500"
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 capitalize">{source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        source === "organic" ? "bg-green-500" :
                        source === "direct" ? "bg-blue-500" :
                        source === "social" ? "bg-purple-500" :
                        "bg-orange-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Views Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Views</h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {analytics.monthlyViews.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary-500 rounded-t-lg transition-all duration-500 hover:bg-primary-600"
                style={{ height: `${(data.views / Math.max(...analytics.monthlyViews.map(d => d.views))) * 200}px` }}
              ></div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-900">{data.month}</p>
                <p className="text-xs text-gray-500">{data.views}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;