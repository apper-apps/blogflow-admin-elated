import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
import Dashboard from "@/components/pages/Dashboard";
import BlogList from "@/components/pages/BlogList";
import BlogEditor from "@/components/pages/BlogEditor";
import BlogView from "@/components/pages/BlogView";
import Categories from "@/components/pages/Categories";
import Analytics from "@/components/pages/Analytics";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/new" element={<BlogEditor />} />
          <Route path="blogs/:id" element={<BlogView />} />
          <Route path="blogs/:id/edit" element={<BlogEditor />} />
          <Route path="categories" element={<Categories />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="scale-in"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;