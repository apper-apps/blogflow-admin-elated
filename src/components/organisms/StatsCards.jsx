import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Posts",
      value: stats.totalPosts,
      icon: "FileText",
      color: "primary",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Published",
      value: stats.publishedPosts,
      icon: "CheckCircle",
      color: "success",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Drafts",
      value: stats.draftPosts,
      icon: "Edit",
      color: "warning",
      change: "+4%",
      changeType: "positive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <ApperIcon 
                  name={card.changeType === "positive" ? "TrendingUp" : "TrendingDown"} 
                  size={14} 
                  className={card.changeType === "positive" ? "text-green-600" : "text-red-600"}
                />
                <span className={`text-sm font-medium ${
                  card.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {card.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              card.color === "primary" ? "bg-primary-100" :
              card.color === "success" ? "bg-green-100" :
              card.color === "warning" ? "bg-yellow-100" :
              "bg-gray-100"
            }`}>
              <ApperIcon 
                name={card.icon} 
                size={24} 
                className={
                  card.color === "primary" ? "text-primary-600" :
                  card.color === "success" ? "text-green-600" :
                  card.color === "warning" ? "text-yellow-600" :
                  "text-gray-600"
                }
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;