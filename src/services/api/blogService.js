import blogsData from "@/services/mockData/blogs.json";

class BlogService {
  constructor() {
    this.blogs = [...blogsData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all blogs
  async getAll() {
    await this.delay();
    return [...this.blogs];
  }

  // Get blog by ID
  async getById(id) {
    await this.delay();
    const blog = this.blogs.find(blog => blog.Id === parseInt(id));
    if (!blog) {
      throw new Error("Blog not found");
    }
    return { ...blog };
  }

  // Create new blog
  async create(blogData) {
    await this.delay();
    const newBlog = {
      ...blogData,
      Id: Math.max(...this.blogs.map(b => b.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: "user1"
    };
    this.blogs.push(newBlog);
    return { ...newBlog };
  }

  // Update blog
  async update(id, blogData) {
    await this.delay();
    const index = this.blogs.findIndex(blog => blog.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Blog not found");
    }
    
    const updatedBlog = {
      ...this.blogs[index],
      ...blogData,
      updatedAt: new Date().toISOString()
    };
    
    this.blogs[index] = updatedBlog;
    return { ...updatedBlog };
  }

  // Delete blog
  async delete(id) {
    await this.delay();
    const index = this.blogs.findIndex(blog => blog.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Blog not found");
    }
    
    this.blogs.splice(index, 1);
    return { success: true };
  }

  // Search blogs
  async search(query) {
    await this.delay();
    if (!query.trim()) {
      return [...this.blogs];
    }
    
    const searchTerm = query.toLowerCase();
    return this.blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.content.toLowerCase().includes(searchTerm) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Filter blogs by status
  async filterByStatus(status) {
    await this.delay();
    if (status === "all") {
      return [...this.blogs];
    }
    return this.blogs.filter(blog => blog.status === status);
  }

  // Get blog statistics
  async getStats() {
    await this.delay();
    return {
      totalPosts: this.blogs.length,
      publishedPosts: this.blogs.filter(blog => blog.status === "published").length,
      draftPosts: this.blogs.filter(blog => blog.status === "draft").length
    };
  }
}

export default new BlogService();